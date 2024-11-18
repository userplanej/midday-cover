'use server';

import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
// import { anthropic } from "@ai-sdk/anthropic";
import { experimental_createProviderRegistry, streamText, convertToCoreMessages , tool} from "ai";
// import { google } from "@ai-sdk/google";
import { getAllTrackingInformation, getOrders } from '@/components/data';
import { z } from "zod";
import { createResource } from './resources';
import { findRelevantContent } from './embedding';

const registry = experimental_createProviderRegistry({
  openai,
  // anthropic,
  // google,
});

const models = [
  "openai:gpt-4o",
  "openai:gpt-4o-mini",
  "anthropic:claude-3-sonnet-20240229",
  "google:gemini-1.5-flash",
];

const tracking_information = JSON.stringify(getAllTrackingInformation());
const orders_context = JSON.stringify(getOrders());

export async function generateCompletion(prompt: string) {

  console.log('generateCompletion received prompt : ', prompt);

  const result = await streamText({               
    model: registry.languageModel(models[0] as string),
    system: `\
You are a helpful assistant. 
you can help a user with orders ,tracking information and knowledge.
      - orders is provided to you with ${orders_context} for question about orders.
      - tracking information is provided to you with ${tracking_information} for questions about tracking.
      - you can answer question about orders and tracking information based on the context provided.
      - you can also answer general questions based on the knowledge base.
      - Be sure to use 'getInformation' tool from your knowledge base before answering general questions.
      - if no relevant information is found, respond, "메모리된 기억에서는 찾을 수 없어요. 다음 Agent를 호출하도록 하겠습니다.".
      - If relevant information is found in knowledge base for general question, respond with "메모리에 의하면, [response]."
      - when you answer a question, you should provide a response with "주인님, " at the beginning.
      - you do not ever use lists, tables, or bullet points; instead, you provide a single response.
      - If the user presents infromation about themselves, use the 'addResource' tool to store it. 
    `,
    maxSteps: 5,
    tools: {
        addResource: tool({
          description: `add a resource to your knowledge base.`,
          parameters: z.object({
            content: z
              .string()
              .describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => createResource({ content }),
        }),
        getInformation: tool({
          description: `get information from your knowledge base to answer general questions.`,
          parameters: z.object({
            question: z.string().describe('the users question'),
          }),
          execute: async ({ question }) => findRelevantContent(question),
        }),
    },
    onStepFinish: async ({ toolResults }) => {
      console.log(`generateCompletion STEP RESULTS: ${JSON.stringify(toolResults, null, 2)}`);
    },
    prompt,

    onFinish: (result) => {
      console.log('generateCompletion onFinish:', result);
    } 
  });

  // for await (const partialText of result.textStream) {
  //   stream.update(partialText);
  // } 

  // stream.done();


  return createStreamableValue(result.textStream).value;
}
