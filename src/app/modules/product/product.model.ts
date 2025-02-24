import { model, Schema } from 'mongoose';
import type { Query } from 'mongoose';
import type { TProductDocument } from './product.types';

const productSchema = new Schema<TProductDocument>({
	name: {
		type: String,
		required: [true, 'Product name is required!'],
		trim: true,
		minlength: [1, 'Product name must not be empty!'],
	},
	brand: {
		type: String,
		required: [true, 'Product brand is required!'],
		trim: true,
		minlength: [1, 'Product brand must not be empty!'],
	},
	price: {
		type: Number,
		required: [true, 'Product price is required!'],
		min: [0, 'Product price must be a positive number!'],
	},
	category: {
		type: String,
		enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
		required: [true, 'Product category is required!'],
	},
	bikeModel: {
		type: String,
		required: [true, 'Product model is required!'],
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Product description is required!'],
		minlength: [1, 'Product description must not be empty!'],
		trim: true,
	},
	quantity: {
		type: Number,
		required: [true, 'Product stock is required!'],
		min: [0, 'Stock must be a non-negative number!'],
	},
	inStock: {
		type: Boolean,
		default: true,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	image: {
		type: String,
		required: [true, 'Product image is required!'],
	  },
}, {
	timestamps: true,
});
  

productSchema.pre(/^find/, function (next) {
	const query = this as Query<TProductDocument, TProductDocument>;

	query.find({ isDeleted: { $ne: true } }).projection({ isDeleted: 0 });

	next();
});

export const Product = model<TProductDocument>('Product', productSchema);
