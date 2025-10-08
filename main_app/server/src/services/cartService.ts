import mongoose from 'mongoose';
import * as productDao from '../dao/productDao';
import * as cartDao from '../dao/cartDao';
import { CartDocument } from '../models/Cart';

export interface CartService {
  getCart(userId: mongoose.Types.ObjectId): Promise<CartDocument | null>;
  addToCart(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number): Promise<CartDocument>;
  updateCartItem(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number): Promise<CartDocument>;
  removeFromCart(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId): Promise<CartDocument>;
  clearCart(userId: mongoose.Types.ObjectId): Promise<CartDocument>;
}

export class CartServiceImpl implements CartService {
  constructor() {
    // Implementation
  }

  async getCart(userId: mongoose.Types.ObjectId): Promise<CartDocument | null> {
    return await cartDao.findCartByUserId(userId);
  }

  async addToCart(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number): Promise<CartDocument> {
    const product = await productDao.findProductById(productId.toString());
    if (!product) {
      throw new Error('Product not found');
    }

    return await cartDao.addItemToCart(userId, productId, quantity, {
      name: product.name,
      price: product.price,
      unit: product.unit
    });
  }

  async updateCartItem(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number): Promise<CartDocument> {
    return await cartDao.updateCartItemQuantity(userId, productId, quantity);
  }

  async removeFromCart(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId): Promise<CartDocument> {
    return await cartDao.removeItemFromCart(userId, productId);
  }

  async clearCart(userId: mongoose.Types.ObjectId): Promise<CartDocument> {
    return await cartDao.clearCartItems(userId);
  }
}

