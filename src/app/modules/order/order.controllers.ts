import orderServices from './order.services';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';

const createOrder = catchAsync(async (req, res) => {
	const order = await orderServices.saveOrderInDB(req.body);
	sendResponse(res, 'Order', 'POST', order, 'Order created successfully!');
});


export default { createOrder };
