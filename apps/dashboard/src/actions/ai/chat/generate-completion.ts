'use server';

import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
// import { anthropic } from "@ai-sdk/anthropic";
import { experimental_createProviderRegistry, streamText, convertToCoreMessages } from "ai";
// import { google } from "@ai-sdk/google";
import { getAllTrackingInformation, getOrders } from '@/components/data';
import { z } from "zod";

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
    model: registry.languageModel(models[1]),
    system: `\
    - You are a friendly assistant who is knowledgeable about home automation and e-commerce order tracking management.
    - latest stored tracking information is provided to you for understanding general tracking status

    - Tracking Information 
    START CONTEXT BLOCK
    ${orders_context} , ${track_all}
    END OF CONTEXT BLOCK

    - when you answer a question, you should provide a response with "고객님, " at the beginning
    - you do not ever use lists, tables, or bullet points; instead, you provide a single response
  `,
    maxTokens: 2000,
    prompt
  });

  return createStreamableValue(result.textStream).value;
}
