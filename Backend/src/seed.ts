import pool from './config/db'; 

const seed = async () => {
  try {
    console.log('🌱 Starting seed process...');


    // 1. Create CUSTOMERS Table (This fixes your "relation does not exist" error)
    await pool.query(`DROP TABLE IF EXISTS customers CASCADE`);
    await pool.query(`
      CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      account_number VARCHAR(50) UNIQUE NOT NULL,
      customer_name VARCHAR(100) NOT NULL,
      issue_date DATE NOT NULL,
      interest_rate DECIMAL(5, 2) NOT NULL,
      tenure_months INT NOT NULL,
      emi_due_amount DECIMAL(12, 2) NOT NULL,
      outstanding_balance DECIMAL(12, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "customers" created.');

    // Seed Customers
    await pool.query(`
      INSERT INTO customers (account_number, customer_name, issue_date, interest_rate, tenure_months, emi_due_amount, outstanding_balance) 
      VALUES 
      ('ACC001', 'Acme Corp', '2024-01-15', 8.5, 60, 5000.00, 250000.00),
      ('ACC002', 'Globex', '2024-02-20', 9.2, 48, 7500.00, 320000.00)
    `);
    console.log('✅ Customers inserted.');


await pool.query(`DROP TABLE IF EXISTS payments CASCADE`);
    await pool.query(`
      CREATE TABLE payments (
        payment_id SERIAL PRIMARY KEY,
        account_number VARCHAR(50) REFERENCES customers(account_number),
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        amount_paid NUMERIC(10, 2) NOT NULL,
        payment_mode VARCHAR(50),
        status VARCHAR(50) CHECK (status IN ('SUCCESS', 'FAILURE', 'PENDING')),
        transaction_ref VARCHAR(100)
      );
    `);
    console.log('✅ Table "payments" created.');
    // 2. Insert Dummy Payment (Linked to Customer ID 1)
    // Note: This assumes a customer with ID 1 exists.
    await pool.query(`
      INSERT INTO payments (account_number, amount_paid, payment_mode, transaction_ref)
      VALUES ('ACC001', 5000.00, 'UPI', 'UPI-123456789')
    `);
    console.log('✅ Dummy payment inserted.');


    console.log('🎉 Seeding completed successfully.');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

seed();