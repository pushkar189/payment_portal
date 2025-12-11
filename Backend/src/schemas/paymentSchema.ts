import { z } from 'zod';
export interface PaymentRequest {
  account_number: string;
  amount: number;
}
export const createPaymentSchema = z.object({
  body: z.object({

    account_number: z.string(),

    amount : z.number()
        .nonnegative({ message: "Outstanding balance cannot be negative" }),

  }),
});