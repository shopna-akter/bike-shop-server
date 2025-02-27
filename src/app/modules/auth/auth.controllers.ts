import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import configs from '../../configs';
import { STATUS_CODES } from '../../constants';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { User } from '../user/user.model';
import { authServices } from './auth.services';

const registerUser = catchAsync(async (req, res) => {
	const existingUser = await User.findOne({ email: req.body.email });

	if (existingUser) {
		throw new ErrorWithStatus(
			'Duplicate Error',
			`User already exists with email: ${req.body.email}!`,
			STATUS_CODES.CONFLICT,
			'register_user',
		);
	}
	const user = await authServices.registerUserInDB({
		...req.body,
	});

	sendResponse(res, 'User', 'POST', user, 'User registered successfully!');
});

const loginUser = catchAsync(async (req, res) => {
	const { refreshToken, accessToken, user } = await authServices.loginUser(req.body);
  
	res.cookie('refreshToken', refreshToken, {
	  secure: configs.NODE_ENV === 'production',
	  httpOnly: true,
	});
  
	sendResponse(
		res,
		'User',
		'OK',
		{
		  accessToken,
		  refreshToken,
		  user: {
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role, 
		  },
		},
		'Login successful!'
	  );
	  
  });
  

const refreshToken = catchAsync(async (req, res) => {
	const { refreshToken } = req.cookies;

	const result = await authServices.refreshToken(refreshToken);

	sendResponse(
		res,
		'N/A',
		'OK',
		result,
		'Successfully retrieved new access token!',
	);
});

export const authControllers = { registerUser, loginUser, refreshToken };
