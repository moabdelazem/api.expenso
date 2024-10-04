import { z } from "zod";

export const postExpenseSchema = z.object({
  name: z.string().min(3),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Money amount must be a number with up to 2 decimal places",
  }),
});
