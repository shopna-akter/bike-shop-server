import { z } from 'zod';
import { PRODUCT_CATEGORIES } from './product.constants';

const creationSchema = z.object({
	name: z.string({ message: 'Name of the bike is required' }).trim().min(1, { message: 'Product name must not be empty' }),

	brand: z.string({ message: 'Brand of the product is required' }).trim().min(1, { message: 'Product brand must not be empty' }),

	bikeModel: z.string({ message: 'Bike model is required' }).trim().min(1, { message: 'Bike model must not be empty' }),

	price: z.preprocess(
		(val) => (typeof val === 'string' ? Number(val) : val),
		z.number({ message: 'Price of the product is required' }).min(0, { message: 'Price must be a positive number' })
	),

	category: z.enum(Object.values(PRODUCT_CATEGORIES) as [string, ...string[]], {
		message: `Product category must be one of: ${Object.values(PRODUCT_CATEGORIES).join(', ')} `,
	}),

	description: z.string({ message: 'Description of the product is required' }).trim().min(1, { message: 'Product description must not be empty' }),

	quantity: z.preprocess(
		(val) => (typeof val === 'string' ? Number(val) : val),
		z.number({ message: 'Quantity of the product is required' }).min(0, { message: 'Quantity must be a positive number' })
	),

	inStock: z.boolean({ message: 'Stock availability must be specified' }),

	isDeleted: z.boolean().optional().default(false),
	image: z.string({ message: 'Product image URL is required' }).trim().min(1, { message: 'Product image must not be empty' })
});

const updateSchema = creationSchema.partial(); 

export const zodProduct = { creationSchema, updateSchema };