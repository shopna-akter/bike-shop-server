import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { STATUS_CODES } from '../constants';
import type { DecodedUser } from '../types/interfaces';
import type { IUser } from '../modules/user/user.types';
import type { ms } from '../..';

export const hashPassword = async (password: string): Promise<string> => {
	try {
		return await bcrypt.hash(password, configs.saltRounds);
	} catch (_error) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			'Error hashing password!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'password',
		);
	}
};

export const comparePassword = async (
	rawPassword: string,
	hashedPassword: string,
): Promise<boolean> => {
	try {
		return await bcrypt.compare(rawPassword, hashedPassword);
	} catch (_error) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			'Error comparing password!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'password',
		);
	}
};

export const generateToken = (
	payload: Pick<IUser, 'email' | 'role'>,
	secret: string,
	expiresIn: ms.StringValue,
): string => {
	try {
		return jwt.sign(payload, secret, { expiresIn });
	} catch (_error) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			'Cannot generate token!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'auth',
		);
	}
};

export const verifyToken = (secret: string, token?: string): DecodedUser => {
	if (!token) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'Invalid credentials!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	try {
		return jwt.verify(token, secret) as DecodedUser;
	} catch (_error) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'Your token is invalid or expired!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}
};
