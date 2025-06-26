import { Request, Response, NextFunction } from 'express';
import { CartService, CartServiceImpl } from '../services/cartService';
import { Types } from 'mongoose';

const cartService: CartService = new CartServiceImpl();

export const getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user as { _id: string };
    const userId = new Types.ObjectId(user._id);
    const cart = await cartService.getCart(userId);
    
    if (!cart) {
      void res.status(200).json({ success: true, cart: [] });
      return;
    }

    void res.status(200).json({ success: true, cart: cart.items });
  } catch (error) {
    console.error('Error getting cart:', error);
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user as { _id: string };

    if (!productId || !quantity) {
      void res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
      return;
    }

    const userId = new Types.ObjectId(user._id);
    await cartService.addToCart(userId, productId, quantity);
    void res.status(200).json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    next(error);
  }
};

export const updateCartItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user as { _id: string };

    if (!productId || !quantity) {
      void res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
      return;
    }

    const userId = new Types.ObjectId(user._id);
    await cartService.updateCartItem(userId, productId, quantity);
    void res.status(200).json({ success: true, message: 'Cart item updated' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    next(error);
  }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.body;
    const user = req.user as { _id: string };

    const userId = new Types.ObjectId(user._id);
    await cartService.removeFromCart(userId, productId);
    void res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    next(error);
  }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user as { _id: string };
    const userId = new Types.ObjectId(user._id);
    await cartService.clearCart(userId);
    void res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    next(error);
  }
};
