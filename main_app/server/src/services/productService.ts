import * as productDao from '../dao/productDao';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

export const fetchAllProducts = async () => {
  return await productDao.findAllProducts();
};

export const fetchProductById = async (id: string) => {
  return await productDao.findProductById(id);
};

export const fetchProductsByCategory = async (category: string) => {
  return await productDao.findProductsByCategory(category);
};

export const createNewProduct = async (body: any, userId: string, files: Express.Multer.File[]) => {
  const imagePaths = files?.map((file) => `/uploads/products/${file.filename}`) || [];

  return await productDao.createProductRecord({
    ...body,
    price: Number(body.price),
    quantity: Number(body.quantity),
    farmerId: userId,
    images: imagePaths,
    status: 'available'
  });
};

export const updateProductById = async (productId: string, body: any, userId: string, files: Express.Multer.File[]) => {
  const product = await productDao.findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  // Fix authorization check to handle populated farmerId object
  const farmerIdStr = typeof product.farmerId === 'object' && product.farmerId !== null && '_id' in product.farmerId
    ? String(product.farmerId._id)
    : String(product.farmerId);

  if (farmerIdStr !== userId) {
    throw new Error('Not authorized');
  }

  let updatedImages = [...product.images];

  if (files?.length) {
    const newImages = files.map(file => `/uploads/products/${file.filename}`);
    const keepImages = body.keepImages ? JSON.parse(body.keepImages) : [];

    if (keepImages.length) {
      updatedImages = [...keepImages, ...newImages];
    } else {
      product.images.forEach(img => {
        const filePath = path.join(__dirname, '../../uploads/products', path.basename(img));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      updatedImages = newImages;
    }
  }

  const updatedProduct = await productDao.updateProductById(
    productId,
    {
      ...body,
      price: Number(body.price),
      quantity: Number(body.quantity),
      images: updatedImages
    }
  );

  if (!updatedProduct) {
    throw new Error('Product update failed');
  }
  return updatedProduct;
};

export const deleteProductById = async (productId: string, userId: string) => {
  const product = await productDao.findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  // Fix authorization check to handle populated farmerId object
  const farmerIdStr = typeof product.farmerId === 'object' && product.farmerId !== null && '_id' in product.farmerId
    ? String(product.farmerId._id)
    : String(product.farmerId);

  if (farmerIdStr !== userId) {
    throw new Error('Not authorized');
  }

  product.images.forEach(img => {
    const filePath = path.join(__dirname, '../../uploads/products', path.basename(img));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });

  await productDao.deleteProductById(productId);
};

export const getPricePredictions = async (query: string) => {
  const response = await axios.get('https://serpapi.com/search.json', {
    params: {
      engine: 'google_shopping',
      q: query,
      gl: 'in',
      hl: 'en',
      api_key: process.env.SERP_API_KEY,
      num: 5
    }
  });

  if (!response.data?.shopping_results) throw new Error('Invalid SERP response');

  return response.data.shopping_results
    .filter((item: any) => typeof item.price === 'string')
    .map((item: any) => ({
      title: item.title || 'Unknown Product',
      price: item.price.replace(/[^0-9,.]/g, ''),
      source: item.source || 'Unknown Source'
    }))
    .slice(0, 5);
};
