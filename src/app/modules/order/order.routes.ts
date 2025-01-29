import express from 'express';
import orderControllers from './order.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { zodOrder } from './order.validation';

const router = express.Router();

router.post(
	'/',
	validateRequest(zodOrder.creationSchema),
	orderControllers.createOrder,
);

export const orderRoutes = router;
