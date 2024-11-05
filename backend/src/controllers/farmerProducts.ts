import Product from "../models/admin.farmer.model"; // Adjust this import based on your structure
import { Response, Request, NextFunction } from "express";

export const listProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract data from the request body
    const {
      farmerId,
      name,
      category,
      price,
      quantity,
      description,
      image,
      unit,
    } = req.body;
    console.log("got the request", farmerId);

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
          "Please provide all required fields: farmerId, name, category, price, quantity, and image.",
      });
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
      image, // Assuming image is being sent as Buffer in the request body
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Return the saved product as the response
    res.status(201).json(savedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract farmerId from the request body
    const { farmerId } = req.body;
    console.log("Fetching products for farmer:", farmerId);

    // Ensure farmerId is provided
    if (!farmerId) {
      return res.status(400).json({ error: "Please provide the farmerId." });
    }

    // Retrieve all products listed by the farmer
    const farmerProducts = await Product.find({ farmerId });

    // Check if any products are found
    if (farmerProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this farmer." });
    }

    // Return the products as the response
    res.status(200).json(farmerProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract productId and the updated fields from the request body
    const {
      productId,
      farmerId,
      name,
      category,
      price,
      quantity,
      description,
      image,
      unit,
    } = req.body;
    console.log("Updating product:", productId);

    // Ensure productId and farmerId are provided
    if (!productId || !farmerId) {
      return res
        .status(400)
        .json({ error: "Please provide both productId and farmerId." });
    }

    // Locate and update the product using productId and farmerId
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, farmerId }, // Ensure the product belongs to the farmer
      { name, category, price, quantity, description, image, unit }, // Fields to update
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized to update." });
    }

    // Return the updated product as the response
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract productId and farmerId from the request body
    const { productId, farmerId } = req.body;
    console.log("Deleting product:", productId);

    // Ensure productId and farmerId are provided
    if (!productId || !farmerId) {
      return res
        .status(400)
        .json({ error: "Please provide both productId and farmerId." });
    }

    // Find and delete the product by productId and farmerId
    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      farmerId,
    });

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized to delete." });
    }

    // Return success message as the response
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
