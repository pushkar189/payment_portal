import request from 'supertest';
import app from '../app';
import pool from '../config/db';

// MOCK: Tell Jest to replace 'pg' with our mock functions
jest.mock('../config/db', () => {
  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => Promise.resolve(mClient)),
    query: jest.fn(),
  };
  return mPool;
});

describe('Loan App API Endpoints', () => {
  // Access the mocked pool and client for validation
  const mockPool = pool as any;
  let mockClient: any;

  beforeEach(async () => {
    // Get the client mock instance (returned by pool.connect)
    mockClient = await mockPool.connect();
  });

  describe('GET /api/customers', () => {
    it('should return a list of customers', async () => {
      // Mock DB Response
      const mockCustomers = [
        { account_number: 'LN123', customer_name: 'John Doe', outstanding_balance: 5000 },
      ];
      mockPool.query.mockResolvedValueOnce({ rows: mockCustomers });

      const res = await request(app).get('/api/customers');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].account_number).toBe('LN123');
    });
  });

  describe('POST /api/payments', () => {
    it('should fail validation if amount is invalid', async () => {
      const res = await request(app).post('/api/payments').send({
        account_number: 'LN123',
        amount: -500, // Invalid amount
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Invalid payment/);
    });

    it('should process a successful payment transaction', async () => {
      // 1. Mock "BEGIN" (This was missing!)
      mockClient.query.mockResolvedValueOnce({}); 

      // 2. Mock "SELECT ... FOR UPDATE"
      mockClient.query.mockResolvedValueOnce({ 
        rows: [{ outstanding_balance: 10000 }] 
      });

      // 3. Mock "INSERT INTO payments"
      mockClient.query.mockResolvedValueOnce({ 
        rows: [{ payment_id: 1, payment_date: new Date() }] 
      });

      // 4. Mock "UPDATE customers"
      mockClient.query.mockResolvedValueOnce({}); 

      // 5. Mock "COMMIT"
      mockClient.query.mockResolvedValueOnce({});

      const res = await request(app).post('/api/payments').send({
        account_number: 'LN123',
        amount: 2000,
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Payment processed successfully');
      expect(res.body.data.new_balance).toBe(8000); 

      // Verify the transaction flow
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });

    it('should rollback transaction if database fails', async () => {
      // 1. "SELECT" succeeds
      mockClient.query.mockResolvedValueOnce({ 
        rows: [{ outstanding_balance: 10000 }] 
      });

      // 2. "INSERT" FAILS (Simulate DB Error)
      mockClient.query.mockRejectedValueOnce(new Error('DB Connection Error'));

      const res = await request(app).post('/api/payments').send({
        account_number: 'LN123',
        amount: 2000,
      });

      expect(res.status).toBe(500);
      expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK'); // Ensure Rollback happened
      expect(mockClient.release).toHaveBeenCalled();
    });
  });
});