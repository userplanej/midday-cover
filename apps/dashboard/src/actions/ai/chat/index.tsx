"use server";

import { BotCard, BotMessage, Message, SpinnerMessage } from "@/components/chat/messages";
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
import { CoreMessage, generateId, generateObject, StreamData } from "ai";
import { CameraView } from "@/components/camera-view";
import { UsageView } from "@/components/usage-view";
import { Orders } from "@/components/orders";
import { getAllTrackingInformation, getOrders, getTrackingInformation } from "@/components/data";
import { Tracker } from "@/components/tracker";


const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, "10s"),
  redis: RedisClient,
});

// export type MiddayAgentState = {
//   category?: CategoryType;
//   artifact: string;
// };
// export type CategoryType = 'financial' | 'ecommerce' | 'automation' | 'knowledge' | 'exception';
   
// const methods: z.ZodType<Method> = z.enum(['get', 'GET', ...]);
const categorySchema =  z.enum( ["financial", "ecommerce", "automation", "knowledge", "exception"]);

export async function generatePath(
  query: string , artifact : string
) {
"use server";
  console.log('Router received query  : ', query);
  console.log('Router received artifact  : ', artifact);
    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        category: categorySchema,
      }),
      system: `\
     query와 artifact가 주어지면, 주어진 카테고리 정보 중에서 해당 문장에 가장 적합한 카테고리를 선택하세요.
     Artifact는 이전단계의 결과입니다.
# Steps

1. **문장 해석하기**: 주어진 입력 문장을 분석하여 문장의 주요 주제, 문맥, 감정, 또는 의미를 파악합니다.
2. **카테고리와 비교**: 모든 카테고리와 주어진 문장을 비교하여 가장 잘 맞는 카테고리를 찾습니다.
3. **근거 마련**: 선택한 카테고리를 결정하기 전에, 각 카테고리와의 연관성에 대한 짧은 이유를 생각해 보세요.
4. **카테고리 결정**: 가장 연관성이 높은 카테고리를 선택하세요.

# Output Format

- 최종적으로 선택된 카테고리를 출력합니다.
- 출력은 간결하게 텍스트 형태로 나타냅니다.

# Examples

**입력 문장**: "온라인 주문목록 확인해줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "ecommerce"

**입력 문장**: "캠보여줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "automation"

**입력 문장**: "애플TV 배송현황 알려줘"
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "ecommerce" 

**입력 문장**: "보안카메라 보여줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "automation"

**입력 문장**: "아이폰 새로 구매한거 추적해줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "ecommerce" 

**입력 문장**: "이번달 전기사용량 알려줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "automation"

**입력 문장**: "이번달 수익 보고서 만들어줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "financial"

**입력 문장**: "이번달 지출 내역 알려줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "financial"

**입력 문장**: "지난주 방문한 중국 음식점 정보 알려줘."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "knowledge"

**입력 문장**: "지난주 방문한 중국 음식점 이름이 뭐야."
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "knowledge"

**입력 문장**: "메모리에 의하면,"
**카테고리들**: ["financial", "ecommerce", "automation", "knowledge", "exception"]
**출력**: "knowledge"

# Notes

- 입력 문장이 명확하게 하나 이상의 카테고리에 속하는 경우, 가장 적합한 하나를 선택하세요.
- 카테고리 정보가 모호하거나 모두와 일치하지 않은 경우에도, 주제를 고려해 가장 적합한 것을 선택하세요.
    `,
      prompt: `Select the most appropriate category based on the query and artifact.
      Artifact is comming from previous step.

      Query:
      ${query}
      Artifact:
      ${artifact}
      '`,
    });

  return  result.object;
}

export async function automationAssistant(  content: string, artifact: string
): Promise<ClientMessage> {
  "use server";
  console.log('automationAssistant assists you');
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

  const result = await streamUI({
    model: openai("gpt-4o"),
    initial: <SpinnerMessage />,
    system:' You are a helpful assistant',
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
        display: null,
      })),
    ],
    tools: {
      viewCameras: {
        description: "view security cameras",
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
      viewUsage: {
        description: "view current usage for electricity, water, or gas",
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
    },
  },
  );
  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export async function generalAssistant(  content: string, artifact: string
): Promise<ClientMessage> {
  "use server";
  console.log('generalAssistant assists you');
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

  // const result = await streamUI({
  //   model: openai("gpt-4o"),
  //   initial: <SpinnerMessage />,
  //   system:' You are a helpful assistant',
  //   messages: [
  //     ...aiState.get().messages.map((message: any) => ({
  //       role: message.role,
  //       content: message.content,
  //       name: message.name,
  //       display: null,
  //     })),
  //   ],
  // });

  return {
    id: nanoid(),
    role: "assistant",
    display: null,
  };
}


export async function ecommerceAssistant(  content: string, artifact: string
): Promise<ClientMessage> {
  "use server";
  console.log('ecommerceAssistant assists you');
  console.log('ecommerceAssistant prompts : ', content);
  console.log('ecommerceAssistant artifact : ', artifact);
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
  const tracking_information = JSON.stringify(getAllTrackingInformation());
  const orders_context = JSON.stringify(getOrders());
  const result = await streamUI({
    model: openai("gpt-4o"),
    initial: <SpinnerMessage />,
   
    system: `\
You are a helpful assistant.
You will be provided with the latest order list, tracking information, and an Artifact. Analyze the user query to determine which tool is suitable based on the provided data.
The following contexts will be given:

- Order List: The latest context of user orders will be in the block 
${orders_context}
- Tracking Information: Shipping details associated with the orders will be available in the 
${tracking_information} block.
- Artifact: The Artifact from the previous step will be given in the 
${artifact} block.

Use these contexts to understand and respond to the user's query effectively.

# Notes

- Make sure to thoroughly analyze the user's input before choosing the tool.
- If the required information spans multiple contexts, correlate them effectively before making a decision.
- Always provide the  'orderId'  if the user is asking about a specific order's status or shipping details.
`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
        display: null,
      })),
    ],
    tools: {
      listOrders: {
        description: "list all e-commerce orders",
        parameters: z.object({}),
        generate: async function* ({}) {
          const toolCallId = generateId();
          let orders = getOrders();
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
                    toolName: "listOrders",
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
                    toolName: "listOrders",
                    toolCallId,
                    result: `The current orders are currently displayed on the screen`,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <Orders orders={orders} />
            </BotCard>
          );
        },
      },
      viewTrackingInformation: {
        description: "view tracking information for  orderId",
        parameters: z.object({
          orderId: z.string().describe('id of ORDER matched the requested product'),
        }),
        generate: async function* (orderId) {
          const toolCallId = generateId();
          const trackingInformation = getTrackingInformation(orderId);
          console.log('getTrackingInformation : ', orderId);
         
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
                    toolName: "viewTrackingInformation",
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
                    toolName: "viewTrackingInformation",
                    toolCallId,
                    result: `The current orders are currently displayed on the screen`,
                  },
                ],
              },
            ],
          });
          return <Message role="assistant" content={<Tracker trackingInformation={trackingInformation} />} />;
        },
      },
    },
  },
  );
  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export async function financialAssistant(
  content: string, artifact: string
): Promise<ClientMessage> {
  "use server";
  console.log('financialAssistant assists you');
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

      // `\
    //   - You are a helpful assistant
    //   - latest stored tracking information is provided to you for understanding general tracking status.
    //   - If user's activity is related to financial, find appropriate tool to call.
    
    //     START CONTEXT BLOCK
    //       ${orders_context}  
    //       ${track_all}
    //       ${artifact}
    //     END OF CONTEXT BLOCK
    // `,
  // **When to use \`createDocument\`:**
  // - For substantial content (>10 lines)
  // - For content users will likely save/reuse (emails, code, essays, etc.)
  // - When explicitly requested to create a document

  // **When NOT to use \`createDocument\`:**
  // - For short content (<10 lines)
  // - For informational/explanatory content
  // - For conversational responses
  // - When asked to keep it in chat

  // **Using \`updateDocument\`:**
  // - Default to full document rewrites for major changes
  // - Use targeted updates only for specific, isolated changes
  // - Follow user instructions for which parts to modify

  const result = await streamUI({
    model: openai("gpt-4o"),
    initial: <SpinnerMessage />,
    system: `You are a helpful assistant.`,
    
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
        display: null,
      })),
    ],
    // text: ({ content, done, delta }) => {
    //   if (!textStream) {
    //     textStream = createStreamableValue("");
    //     textNode = <BotMessage content={textStream.value} />;
    //   }

    //   if (done) {
    //     textStream.done();
    //     aiState.done({
    //       ...aiState.get(),
    //       messages: [
    //         ...aiState.get().messages,
    //         {
    //           id: nanoid(),
    //           role: "assistant",
    //           content,
    //         },
    //       ],
    //     });
    //   } else {
    //     textStream.update(delta);
    //   }

    //   return textNode;
    // },
    tools: {
      getSpending: getSpendingTool({
        aiState,
        currency: defaultValues.currency,
        dateFrom: defaultValues.from,
        dateTo: defaultValues.to,
      }),

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
    financialAssistant,
    ecommerceAssistant,
    automationAssistant,
    generalAssistant,
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
