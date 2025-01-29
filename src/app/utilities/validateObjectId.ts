import { isValidObjectId } from 'mongoose';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { STATUS_CODES } from '../constants';
import type { TCollection } from '../types';

export const validateObjectId = (
	id: string,
	collection: Lowercase<TCollection>,
	path: string,
) => {
	if (!isValidObjectId(id)) {
		throw new ErrorWithStatus(
			'Validation Error',
			`Invalid ${collection} ID: ${id}`,
			STATUS_CODES.BAD_REQUEST,
			path,
		);
	}
};
