import { Router } from 'express';
import { createPayment, getPaymentHistory } from '../controllers/paymentController';
import { validate } from '../middleware/validate';
import { createPaymentSchema } from '../schemas/paymentSchema';

const router = Router();

router.post('/', validate(createPaymentSchema), createPayment);
router.get('/:account_number', getPaymentHistory);

export default router;