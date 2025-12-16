import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import customerRoutes from './routes/customerRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);

export default app;