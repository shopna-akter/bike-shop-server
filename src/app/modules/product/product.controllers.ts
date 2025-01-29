import { zodProduct } from './product.validation';
import productServices from './product.services';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';

const createProduct = catchAsync(async (req, res) => {
	const product = await productServices.saveProductInDB(req.body);

	sendResponse(res, 'Bike', 'POST', product);
});

const getAllProducts = catchAsync(async (req, res) => {
	const { searchTerm } = req.query;

	const products = await productServices.getAllProductsFromDB(
		searchTerm as string,
	);

	sendResponse(res, 'Bike', 'GET', products);
});

const getSingleProduct = catchAsync(async (req, res) => {
	const { id } = req.params;

	const product = await productServices.getSingleProductFromDB(id);

	sendResponse(res, 'Bike', 'GET', product);
});
const updateProduct = catchAsync(async (req, res) => {
	const { id } = req.params;

	const update = zodProduct.updateSchema.parse(req.body);

	if (update.quantity && update.quantity > 0) {
		update.inStock = true;
	}
	if (update.quantity && update.quantity <= 0) {
		update.inStock = false;
	}

	const product = await productServices.updateProductInDB(id, update);

	sendResponse(res, 'Bike', 'PATCH', product);
});

const deleteProduct = catchAsync(async (req, res) => {
	const { id } = req.params;

	await productServices.deleteProductFromDB(id);

	sendResponse(res, 'Bike', 'DELETE');
});

export const productControllers = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
};
