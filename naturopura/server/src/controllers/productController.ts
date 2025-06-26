import { Request, Response } from 'express';
import * as productService from '../services/productService';
import statusCode from '../utils/statusCode';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.fetchAllProducts();
    res.status(statusCode.OK).json(products);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.fetchProductById(req.params.id);
    if (!product) {
      res.status(statusCode.NOT_FOUND).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(statusCode.OK).json(product);
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const product = await productService.createNewProduct(req.body, req.user._id, req.files as Express.Multer.File[]);
    res.status(statusCode.CREATED).json({ success: true, data: product });
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const updatedProduct = await productService.updateProductById(
      req.params.id,
      req.body,
      req.user._id,
      req.files as Express.Multer.File[]
    );
    res.status(statusCode.OK).json({ success: true, data: updatedProduct });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : '';
    const status =
      errMsg === 'Product not found'
        ? statusCode.NOT_FOUND
        : errMsg === 'Not authorized'
        ? statusCode.FORBIDDEN
        : statusCode.BAD_REQUEST;

    res.status(status).json({ success: false, message: errMsg || 'Something went wrong' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }

    await productService.deleteProductById(req.params.id, req.user._id);
    res.status(statusCode.OK).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : '';
    const status =
      errMsg === 'Product not found'
        ? statusCode.NOT_FOUND
        : errMsg === 'Not authorized'
        ? statusCode.FORBIDDEN
        : statusCode.INTERNAL_SERVER_ERROR;

    res.status(status).json({ success: false, message: errMsg || 'Something went wrong' });
  }
};

export const predictPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      res.status(statusCode.BAD_REQUEST).json({ success: false, message: 'Query parameter is required' });
      return;
    }

    const predictions = await productService.getPricePredictions(q);
    res.status(statusCode.OK).json({ success: true, predictions, query: q });
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Something went wrong';
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
  }
};
