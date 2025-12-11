import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    // FIX: Removed { required_error: ... } and used .min() for the message
    customer_name: z.string()
      .min(1, { message: "Customer name is required" }) 
      .min(2, { message: "Customer name must be at least 2 characters" }),
    
    issue_date: z.string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Format must be DD-MM-YYYY" })
      .transform((date) => {
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`; // Returns "2003-11-21"
      }),
    // FIX: Removed { required_error: ... } to satisfy TS
    interest_rate: z.number()
      .positive({ message: "Interest rate must be positive" }),
    
    tenure_months: z.number()
      .int({ message: "Tenure must be an integer" })
      .positive({ message: "Tenure must be positive" }),
    
    emi_due_amount: z.number()
      .positive({ message: "EMI amount must be positive" }),
    
    outstanding_balance: z.number()
      .nonnegative({ message: "Outstanding balance cannot be negative" }),
  }),
});