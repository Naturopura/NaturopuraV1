import Product from "../models/admin.farmer.model";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticateToken"; // Adjust this import path as necessary

// Existing function to list all products
export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// New function to get product details by ID
export const getProductById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract productId from the request parameters
    const { productId } = req.params as { productId: string };
    console.log("Fetching product details for ID:", productId);

    // Validate productId
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    // Fetch the product from the database using its ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Return the product details
    res.status(200).json(product);
  } catch (error: any) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ error: error.message });
  }
};
