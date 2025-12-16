import { Router } from 'express';
import { createCustomer, getCustomers } from '../controllers/customerController';
import { validate } from '../middleware/validate';
import { createCustomerSchema } from '../schemas/customerSchema';

const router = Router();

router.get('/', getCustomers);
router.post('/',validate(createCustomerSchema),createCustomer);
export default router;