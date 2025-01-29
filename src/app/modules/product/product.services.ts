import type { FilterQuery } from 'mongoose';
import type {
	TProduct,
	TProductDocument,
	TProductNotDeleted,
	TUpdateProduct,
} from './product.types';
import { Product } from './product.model';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { validateObjectId } from '../../utilities/validateObjectId';

const saveProductInDB = async (
	productData: TProduct,
): Promise<TProductNotDeleted> => {
	const product = await Product.create(productData);

	if (!product) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			`Failed to create the Bike!`,
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'create_product',
		);
	}

	const { isDeleted: _skip, ...resultWithoutIsDeleted } = product.toObject();

	return resultWithoutIsDeleted as TProductNotDeleted;
};

const getAllProductsFromDB = async (
	searchTerm?: string,
	page: number = 1,
	limit: number = 10,
	sortField: string = 'createdAt',
	sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<TProductDocument[]> => {
	const filter: FilterQuery<TProductDocument> = {};
  
	if (searchTerm) {
	  filter.$or = [
		{ name: { $regex: searchTerm, $options: 'i' } },
		{ brand: { $regex: searchTerm, $options: 'i' } },
		{ category: { $regex: searchTerm, $options: 'i' } },
	  ];
	}
  
	const skip = (page - 1) * limit;
	const products = await Product.find(filter)
	  .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
	  .skip(skip)
	  .limit(limit);
  
	return products;
  };
  

const getSingleProductFromDB = async (
	id: string,
): Promise<TProductDocument> => {
	validateObjectId(id, 'product', 'get_product');

	const product = await Product.findById(id);

	if (!product) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No Bike found with id: ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'get_product',
		);
	}

	return product;
};
const updateProductInDB = async (
	id: string,
	update: TUpdateProduct,
): Promise<TProductDocument> => {
	validateObjectId(id, 'product', 'update_product');

	const updateOptions = [{ _id: id }, update, { new: true, rawResult: true }];

	const updatedProduct = await Product.findOneAndUpdate(...updateOptions);

	if (!updatedProduct) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`Cannot update specified Bike with id: ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'update_product',
		);
	}

	return updatedProduct;
};

const deleteProductFromDB = async (id: string): Promise<TProductDocument> => {
	validateObjectId(id, 'product', 'delete_product');

	const product = await Product.findByIdAndUpdate(
		id,
		{ isDeleted: true },
		{ new: true },
	);

	if (!product) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`Cannot delete specified Bike with id: ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'delete_product',
		);
	}

	return product;
};

export default {
	saveProductInDB,
	getAllProductsFromDB,
	getSingleProductFromDB,
	updateProductInDB,
	deleteProductFromDB,
};
