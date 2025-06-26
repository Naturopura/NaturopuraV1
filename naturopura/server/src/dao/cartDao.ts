import { Cart } from '../models/Cart';
import mongoose from 'mongoose';

export const findCartByUserId = async (userId: mongoose.Types.ObjectId) => {
  return await Cart.findOne({ userId }).exec();
};

export const createCart = async (userId: mongoose.Types.ObjectId) => {
  const cart = new Cart({ userId, items: [] });
  return await cart.save();
};

export const addItemToCart = async (
  userId: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  quantity: number,
  productData: { name: string; price: number; unit: string }
) => {
  let cart = await Cart.findOne({ userId }).exec();
  if (!cart) {
    cart = await createCart(userId);
  }

  if (!cart) {
    throw new Error('Cart creation failed');
  }

  const existingItem = cart.items.find(item => item.productId.equals(productId));
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      product: productData
    });
  }

  return await cart.save();
};

export const updateCartItemQuantity = async (
  userId: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  quantity: number
) => {
  const cart = await Cart.findOne({ userId }).exec();
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  return await cart.save();
};

export const removeItemFromCart = async (
  userId: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId
) => {
  const cart = await Cart.findOne({ userId }).exec();
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  cart.items.splice(itemIndex, 1);
  return await cart.save();
};

export const clearCartItems = async (userId: mongoose.Types.ObjectId) => {
  const cart = await Cart.findOne({ userId }).exec();
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = [];
  return await cart.save();
};
