import type { AnyZodObject, ZodEffects } from 'zod';
import type { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync(req.body);
			next();
		} catch (error) {
			next(error);
		}
	};
};

export default validateRequest;
