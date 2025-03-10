import configs from '../../configs';
import { User } from '../user/user.model';
import { STATUS_CODES } from '../../constants';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import {
	comparePassword,
	generateToken,
	verifyToken,
} from '../../utilities/authUtilities';
import type { ILoginCredentials, IUserWithTokens, IUser } from '../user/user.types';

const registerUserInDB = async (payload: IUser) => {
	const newUser = await User.create(payload);

	const { _id, name, email, image } = newUser.toObject();

	const user = { _id, name, email, image };

	return user;
};
const loginUser = async (payload: ILoginCredentials): Promise<IUserWithTokens> => {
	const user = await User.validateUser(payload.email);
	const passwordMatched = await comparePassword(payload?.password, user?.password);
  
	if (!passwordMatched) {
	  throw new ErrorWithStatus(
		'Authorization Error',
		`Invalid credentials!`,
		STATUS_CODES.UNAUTHORIZED,
		'auth',
	  );
	}
  
	const jwtPayload = {
	  email: user.email,
	  role: user.role,
	};
  
	const accessToken = generateToken(
	  jwtPayload,
	  configs.accessSecret,
	  configs.accessExpireTime,
	);
  
	const refreshToken = generateToken(
	  jwtPayload,
	  configs.refreshSecret,
	  configs.refreshExpireTime,
	);
	return {
	  user: {
		_id: user._id.toString(),
		name: user.name,
		email: user.email,
		role: user.role,
	  },
	  accessToken,
	  refreshToken,
	};
  };
  
  

const refreshToken = async (token: string): Promise<{ token: string }> => {
	const decodedToken = verifyToken(configs.refreshSecret, token);
	const user = await User.validateUser(decodedToken.email);
	const jwtPayload = {
		email: user.email,
		role: user.role,
	};

	const accessToken = generateToken(
		jwtPayload,
		configs.accessSecret,
		configs.accessExpireTime,
	);

	return { token: accessToken };
};

export const authServices = { registerUserInDB, loginUser, refreshToken };
