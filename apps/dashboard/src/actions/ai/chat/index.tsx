"use server";

import { BotMessage, Message, SpinnerMessage } from "@/components/chat/messages";
import { openai } from "@ai-sdk/openai";
import { client as RedisClient } from "@midday/kv";
import {
  getBankAccountsCurrencies,
  getUser,
} from "@midday/supabase/cached-queries";
import { Ratelimit } from "@upstash/ratelimit";
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { startOfMonth, subMonths } from "date-fns";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { getAssistantSettings, saveChat } from "../storage";
import type { AIState, Chat, ClientMessage, UIState } from "../types";
import { getBurnRateTool } from "./tools/burn-rate";
import { getForecastTool } from "./tools/forecast";
import { getDocumentsTool } from "./tools/get-documents";
import { getTransactionsTool } from "./tools/get-transactions";
import { getProfitTool } from "./tools/profit";
import { createReport } from "./tools/report";
import { getRevenueTool } from "./tools/revenue";
import { getRunwayTool } from "./tools/runway";
import { getSpendingTool } from "./tools/spending";
import { z } from "zod";
import { CoreMessage, generateId } from "ai";
import { CameraView } from "@/components/camera-view";
import { UsageView } from "@/components/usage-view";


const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, "10s"),
  redis: RedisClient,
});

export async function submitUserMessage(
  content: string,
): Promise<ClientMessage> {
  "use server";
  const ip = headers().get("x-forwarded-for");
  const { success } = await ratelimit.limit(ip);

  const aiState = getMutableAIState<typeof AI>();

  if (!success) {
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "assistant",
          content:
            "Not so fast, tiger. You've reached your message limit. Please wait a minute and try again.",
        },
      ],
    });

    return {
      id: nanoid(),
      role: "assistant",
      display: (
        <BotMessage content="Not so fast, tiger. You've reached your message limit. Please wait a minute and try again." />
      ),
    };
  }

  const user = await getUser();
  const teamId = user?.data?.team_id as string;

  const defaultValues = {
    from: subMonths(startOfMonth(new Date()), 12).toISOString(),
    to: new Date().toISOString(),
    currency:
      (await getBankAccountsCurrencies())?.data?.at(0)?.currency ?? "USD",
  };

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <SpinnerMessage />,
    system: `\
    You are a helpful assistant in Midday who can help users ask questions about their transactions, revenue, spending find invoices and more.

    If the user wants to see spending, call \`getSpending\` function.
    If the user just wants the burn rate, call \`getBurnRate\` function.
    If the user just wants the runway, call \`getRunway\` function.
    If the user just wants the profit, call \`getProfit\` function.
    If the user just wants to find transactions, call \`getTransactions\` function.
   
    If the user just wants to find documents, invoices or receipts, call \`getDocuments\` function.
    If the user wants to view Cameras, call \`viewCameras\` function.
   
    Always try to call the functions with default values, otherwise ask the user to respond with parameters. Just show one example if you can't call the function.
    
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
        display: null,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      viewCameras: {
        description: "view current active cameras",
        parameters: z.object({}),
        generate: async function* ({}) {
          const toolCallId = generateId();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "viewCameras",
                    toolCallId,
                    args: {},
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "viewCameras",
                    toolCallId,
                    result: `The active cameras are currently displayed on the screen`,
                  },
                ],
              },
            ],
          });

          return <Message role="assistant" content={<CameraView />} />;
        },
      },
      getSpending: {
        description: "view spendings for unknown catergory",
        parameters: z.object({
          type: z.enum(["electricity", "water", "gas"]),
        }),
        generate: async function* ({ type }) {
          const toolCallId = generateId();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewUsage",
                  args: { type },
                },
              ],
            },
            {
              id: nanoid(),
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewUsage",
                  toolCallId,
                  result: `The current usage for ${type} is currently displayed on the screen`,
                },
              ],
            },
          ],
        });


          return (
            <Message role="assistant" content={<UsageView type={type} />} />
          );
        },
      },
  
      getBurnRate: getBurnRateTool({
        aiState,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),
      getRunway: getRunwayTool({
        aiState,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),
      getProfit: getProfitTool({
        aiState,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),
      getRevenue: getRevenueTool({
        aiState,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),
      getForecast: getForecastTool({
        aiState,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),
      getTransactions: getTransactionsTool({ aiState }),
      getDocuments: getDocumentsTool({ aiState, teamId }),
      createReport: createReport({
        aiState,
        userId: user?.data?.id ?? "",
        teamId,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  onSetAIState: async ({ state, done }) => {
    "use server";

    const settings = await getAssistantSettings();
    const createdAt = new Date();
    const userId = state.user.id;

    const { chatId, messages } = state;

    const firstMessageContent = messages?.at(0)?.content ?? "";
    const title =
      typeof firstMessageContent === "string"
        ? firstMessageContent.substring(0, 100)
        : "";

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      createdAt,
      messages,
    };

    if (done && settings?.enabled) {
      await saveChat(chat);
    }
  },
});
