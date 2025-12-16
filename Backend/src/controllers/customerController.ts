import { Request, Response } from 'express';
import pool from '../config/db';
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.status(200).json({ status: 'success', data: result.rows });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { customer_name, issue_date, interest_rate, tenure_months, emi_due_amount, outstanding_balance } = req.body;


    const [day, month, year] = issue_date.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    const generatedAccountNumber = `ACC-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO customers (
        account_number,        -- Added this column
        customer_name, 
        issue_date, 
        interest_rate, 
        tenure_months, 
        emi_due_amount, 
        outstanding_balance
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        generatedAccountNumber,
        customer_name,       
        formattedDate,
        interest_rate, 
        tenure_months,
        emi_due_amount, 
        outstanding_balance
      ]
    );
    
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};