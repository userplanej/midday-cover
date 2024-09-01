import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  name: z.string().describe("The supplier or company of the invoice."),
  amount: z
    .number()
    .describe("The total amount of the invoice, usually the highest amount."),
  date: z
    .string()
    .describe("The due date of the invoice (ISO 8601 date string)."),
  website: z
    .string()
    .describe(
      "Website of the supplier or company without protocol (e.g. example.com) and only return if it's not null otherwise get the domain namn from the supplier name.",
    ),
  currency: z.string().describe("Currency code of the invoice."),
  description: z
    .string()
    .describe(
      "Summarize the purchase details by focusing on the supplier name and the content of the purchase. Max 1 sentence. Ignore amounts.",
    ),
});

export class LlmProcessor {
  public async getStructuredData(content: string) {
    try {
      const { object } = await generateObject({
        model: openai("gpt-4o-mini"),
        mode: "json",
        schema,
        prompt: content,
      });

      return {
        name: object.name,
        amount: object.amount,
        date: object.date,
        website: object.website?.replace(/^https?:\/\//, ""),
        currency: object.currency,
        description: object.description,
      };
    } catch (error) {
      return null;
    }
  }
}
