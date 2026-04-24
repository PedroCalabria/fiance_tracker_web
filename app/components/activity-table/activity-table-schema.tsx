import z from "zod";

export const activityTableSchema = z.object({
  id: z.number(),
  product: z.string(),
  amount: z.number(),
  installments: z.string(),
  date: z.string(),
  method: z.string(),
  category: z.string(),
});