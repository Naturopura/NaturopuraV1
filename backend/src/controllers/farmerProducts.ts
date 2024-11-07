import Product from "../models/admin.farmer.model";
import Admin from "../models/admin.model";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticateToken"; // Adjust this import path as necessary

export const listProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract data from the request body
    const { name, category, price, quantity, description, unit, image } =
      req.body;
    const farmerId = req.user?.id; // Use req.user from AuthenticatedRequest

    console.log("Received request to list product for farmer:", farmerId);

    // Ensure all required fields are provided
    if (
      !farmerId ||
      !name ||
      !category ||
      !price ||
      !quantity ||
      !image ||
      !unit
    ) {
      return res.status(400).json({
        error:
          "Please provide all required fields: name, category, price, quantity, and image.",
      });
    }

    // Check if the farmer exists
    console.log("Checking if farmer exists...");
    const farmerExists = await Admin.findById(farmerId);
    if (!farmerExists) {
      return res.status(404).json({ error: "Farmer does not exist." });
    }

    // Create a new product using the Product model
    const newProduct = new Product({
      farmerId,
      name,
      category,
      price,
      quantity,
      unit,
      description,
      image,
    });

    // Save the product to the database
    console.log("Saving product to database...");
    const savedProduct = await newProduct.save();

    // Return the saved product as the response
    res.status(201).json(savedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByFarmer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const farmerId = req.user?.id;
    console.log("Fetching products for farmer:", farmerId);

    if (!farmerId) {
      return res
        .status(400)
        .json({ error: "Farmer ID is missing in the token." });
    }

    const farmerProducts = await Product.find({ farmerId });

    if (farmerProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this farmer." });
    }

    res.status(200).json(farmerProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const {
      productId,
      name,
      category,
      price,
      quantity,
      description,
      image,
      unit,
    } = req.body;
    const farmerId = req.user?.id;
    console.log("Updating product:", productId);

    if (!productId || !farmerId) {
      return res
        .status(400)
        .json({ error: "Please provide both productId and farmerId." });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, farmerId },
      { name, category, price, quantity, description, image, unit },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized to update." });
    }

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { productId } = req.body;
    const farmerId = req.user?.id;
    console.log("Deleting product:", productId);

    if (!productId || !farmerId) {
      return res
        .status(400)
        .json({ error: "Please provide both productId and farmerId." });
    }

    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      farmerId,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized to delete." });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
