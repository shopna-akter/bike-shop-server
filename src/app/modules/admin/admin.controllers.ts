import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { adminServices } from './admin.services';

const deactivateUser = catchAsync(async (req, res) => {
	const { id } = req.params;

	const message = await adminServices.deactivateUserInDB(id, req?.user);

	sendResponse(res, 'User', 'PATCH', null, message);
});

export const adminControllers = { deactivateUser };
