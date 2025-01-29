import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import type { ms } from '../..';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const mongoUri = process.env.DATABASE_URL as string;

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(mongoUri);

		console.info('MongoDB is Connected!');
		mongoose.connection.on('connected', () => {
			console.info('MongoDB is Connected!');
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(`MongoDB Error: ${error.message}`);
		} else {
			console.error('Unknown Error Occurred');
		}
	}
};

export default {
	connectDB,
	port: process.env.PORT || 4242,
	NODE_ENV: process.env.NODE_ENV as string,
	saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS as string),
	accessSecret: process.env.JWT_ACCESS_SECRET as string,
	accessExpireTime: process.env.JWT_ACCESS_EXPIRES_IN as ms.StringValue,
	refreshSecret: process.env.JWT_REFRESH_SECRET as string,
	refreshExpireTime: process.env.JWT_REFRESH_EXPIRES_IN as ms.StringValue,
};
