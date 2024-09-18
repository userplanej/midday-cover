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

const track_all = JSON.stringify(getAllTrackingInformation());
const orders_context = JSON.stringify(getOrders());

export async function generateCompletion(prompt: string) {

  console.log('generateCompletion received prompt : ', prompt);

  const result = await streamText({
                       
    model: registry.languageModel(models[1] as string),
    system: `\
      - You are a friendly assistant who is knowledgeable about home automation and e-commerce order tracking management.
      - latest stored tracking information is provided to you for understanding general tracking status

      - Tracking Information 
      START CONTEXT BLOCK
      ${orders_context} , ${track_all}
      END OF CONTEXT BLOCK
      - Be sure to getInformation from your knowledge base before answering any questions.
      - when you answer a question, you should provide a response with "주인님, " at the beginning.
      - you do not ever use lists, tables, or bullet points; instead, you provide a single response.
      - Only respond to questions using Tracking Information and information from tool calls.
      - If the user presents infromation about themselves, use the addResource tool to store it.
      - if no relevant information is found in the tool calls, respond, "기억속에서 찾을 수 없어요. 다음 Agent를 호출하도록 하겠습니다.".
    `,
    maxSteps: 10,
    tools: {
        addResource: tool({
          description: `add a resource to your knowledge base.
            If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
          parameters: z.object({
            content: z
              .string()
              .describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => createResource({ content }),
        }),

    
        getInformation: tool({
          description: `get information from your knowledge base to answer questions.`,
          parameters: z.object({
            question: z.string().describe('the users question'),
          }),
          execute: async ({ question }) => findRelevantContent(question),
        }),
    },
   
    prompt,
    // onFinish: (result) => {
    //   console.log('generateCompletion result : ', result);
    // } 
  });

  return createStreamableValue(result.textStream).value;
}
