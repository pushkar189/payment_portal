import { Request, Response } from 'express';
import pool from '../config/db';
import { PaymentRequest } from '../types';

export const createPayment = async (req: Request, res: Response) => {
  const { account_number, amount }: PaymentRequest = req.body;

  if (!account_number || !amount || amount <= 0) {
    return res.status(400).json({ status: 'error', message: 'Invalid payment details' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const customerRes = await client.query(
      'SELECT * FROM customers WHERE account_number = $1 FOR UPDATE',
      [account_number]
    );

    if (customerRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ status: 'error', message: 'Account not found' });
    }

    const currentBalance = parseFloat(customerRes.rows[0].outstanding_balance);

    const insertPaymentQuery = `
      INSERT INTO payments (account_number, amount_paid, status)
      VALUES ($1, $2, 'SUCCESS')
      RETURNING payment_id, payment_date
    `;
    const paymentRes = await client.query(insertPaymentQuery, [account_number, amount]);

    const newBalance = currentBalance - amount;
    const updateBalanceQuery = `
      UPDATE customers
      SET outstanding_balance = $1
      WHERE account_number = $2
    `;
    await client.query(updateBalanceQuery, [newBalance, account_number]);

    await client.query('COMMIT');

    res.status(201).json({
      status: 'success',
      message: 'Payment processed successfully',
      data: {
        payment_id: paymentRes.rows[0].payment_id,
        new_balance: newBalance
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Payment Transaction Failed:', error);
    res.status(500).json({ status: 'error', message: 'Transaction failed' });
  } finally {
    client.release();
  }
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  const { account_number } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE account_number = $1 ORDER BY payment_date DESC',
      [account_number]
    );
    res.status(200).json({ status: 'success', data: result.rows });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};