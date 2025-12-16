export interface Customer {
  id: number;
  account_number: string;
  customer_name: string;
  issue_date: Date;
  interest_rate: number;
  tenure_months: number;
  emi_due_amount: number;
  outstanding_balance: number;
}

export interface PaymentRequest {
  account_number: string;
  amount: number;
}
