import { Schema, model } from 'mongoose';
import type { IUserDoc, IUserModel } from './user.types';
import { hashPassword } from '../../utilities/authUtilities';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';

const userSchema = new Schema<IUserDoc>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		select: false,
	},
	role: {
		type: String,
		enum: ['customer', 'admin'],
		default: 'customer',
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	image: { type: String, 
	trim: true, 
	default: '' 
	}
}, {
	timestamps: true, // Adds createdAt and updatedAt fields
});

userSchema.pre('save', async function (next) {
	this.password = await hashPassword(this.password);

	next();
});

userSchema.statics.validateUser = async function (email?: string) {
	if (!email) {
		throw new ErrorWithStatus(
			'Authentication Error',
			'Please provide a valid email!',
			STATUS_CODES.BAD_REQUEST,
			'user',
		);
	}

	const user: IUserDoc = await this.findOne({ email }).select('+password');

	if (!user) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No user found with email: ${email}!`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	if (!user.isActive) {
		throw new ErrorWithStatus(
			'Authentication Error',
			`User with email ${email} is Blocked!`,
			STATUS_CODES.FORBIDDEN,
			'user',
		);
	}	

	return user;
};

export const User = model<IUserDoc, IUserModel>('User', userSchema);
