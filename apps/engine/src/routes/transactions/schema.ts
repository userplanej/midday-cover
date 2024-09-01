import { Providers } from "@/common/schema";
import { z } from "@hono/zod-openapi";

export const TransactionsParamsSchema = z
  .object({
    provider: Providers.openapi({
      param: {
        name: "provider",
        in: "query",
      },
      example: Providers.Enum.teller,
    }),
    accountId: z.string().openapi({
      description: "Get transactions by accountId",
      param: {
        name: "accountId",
        in: "query",
      },
      example: "5341343-4234-4c65-815c-t234213442",
    }),
    accountType: z.enum(["credit", "depository"]).openapi({
      description:
        "Get transactions with the correct amount depending on credit or depository",
      param: {
        name: "accountType",
        in: "query",
      },
      example: "depository",
    }),
    accessToken: z
      .string()
      .optional()
      .openapi({
        description: "Used for Teller and Plaid",
        param: {
          name: "accessToken",
          in: "query",
        },
        example: "token-123",
      }),
    latest: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional()
      .openapi({
        description: "Get latest transactions",
        param: {
          name: "latest",
          in: "query",
        },
        example: "true",
      }),
  })
  .openapi("TransactionsParamsSchema");

export const TransactionSchema = z
  .object({
    id: z.string().openapi({
      example: "9293961c-df93-4d6d-a2cc-fc3e353b2d10",
    }),
    description: z
      .string()
      .openapi({
        example: "Transfer to bank account",
      })
      .nullable(),
    method: z
      .string()
      .openapi({
        example: "other",
      })
      .nullable(),
    amount: z.number().openapi({
      example: 100,
    }),
    name: z.string().openapi({
      example: "Vercel Inc.",
    }),
    date: z.string().openapi({
      example: "2024-06-12",
    }),
    currency: z.string().openapi({
      example: "USD",
    }),
    status: z.enum(["pending", "posted"]).openapi({
      example: "posted",
    }),
    category: z
      .string()
      .openapi({
        example: "travel",
      })
      .nullable(),
    balance: z
      .number()
      .openapi({
        example: 10000,
      })
      .nullable(),
  })
  .openapi("TransactionSchema");

export const TransactionsSchema = z
  .object({
    data: z.array(TransactionSchema),
  })
  .openapi("TransactionsSchema");
