import { Order } from './order.model';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import type {  TOrder, TOrderDocument } from './order.types';
import { STATUS_CODES } from '../../constants';

const saveOrderInDB = async (orderData: TOrder): Promise<TOrderDocument> => {
	const order = await Order.create(orderData);

	if (!order) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			`Failed to create order!`,
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'create_order',
		);
	}

	return order;
};


export default { saveOrderInDB };
