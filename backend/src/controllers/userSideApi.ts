import Product from "../models/admin.farmer.product";
import { Response, NextFunction, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticateToken"; // Adjust this import path as necessary
import mongoose from "mongoose";
import Category from "../models/admin.farmer.category";

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

export const getCategory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({}, "name _id image");

    // Check if no categories exist
    if (!categories.length) {
      res.status(404).json({ error: "No categories found." });
      return;
    }

    // Return the list of categories
    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (error: any) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByCategoryAndPagination = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { categoryId, page = 1, limit = 6 } = req.query;

    // Ensure categoryId is provided
    if (!categoryId) {
      res
        .status(400)
        .json({ success: false, message: "categoryId is required." });
      return;
    }

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId as string)) {
      res.status(400).json({ success: false, message: "Invalid categoryId." });
      return;
    }

    // Parse page and limit to numbers
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Validate pagination parameters
    if (!pageNumber || pageNumber < 1) {
      res.status(400).json({ success: false, message: "Invalid page number." });
      return;
    }

    if (!limitNumber || limitNumber < 1) {
      res
        .status(400)
        .json({ success: false, message: "Invalid limit number." });
      return;
    }

    // Calculate documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Build query filter
    const filter: any = {
      category: new mongoose.Types.ObjectId(categoryId as string),
    };

    // Fetch products with pagination and sorting
    const products = await Product.find(filter)
      .populate("category") // Populates category details if needed
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log("Products:", products.length);

    // Get total product count for the filter
    const totalProducts = await Product.countDocuments(filter);
    console.log("Total Products:", totalProducts);

    // Respond with paginated data
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalProducts: totalProducts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

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
    return res.status(200).json(product);
  } catch (error: any) {
    console.error("Error fetching product by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const searchFilterAndSortProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      query,
      category,
      minPrice,
      maxPrice,
      limit = 6,
      page = 1,
      sort = "all",
    } = req.query;

    // Build the filter object dynamically
    const filter: Record<string, any> = {};

    // Add search query to filter
    if (query) {
      filter.name = { $regex: query, $options: "i" }; // Case-insensitive regex search
    }

    // Add category filter
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category as string)) {
        filter.category = new mongoose.Types.ObjectId(category as string);
      } else {
        res.status(400).json({ error: "Invalid category ID" });
        return;
      }
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
    }

    // Convert pagination params to numbers
    const limitNum = parseInt(limit as string, 10) || 6;
    const pageNum = parseInt(page as string, 10) || 1;

    // Determine sorting logic
    let sortOption: Record<string, any> = {};
    switch (sort) {
      case "newest":
        sortOption = { createdAt: -1 }; // Newest first
        break;
      case "price_low_to_high":
        sortOption = { price: 1 }; // Price ascending
        break;
      case "price_high_to_low":
        sortOption = { price: -1 }; // Price descending
        break;
      case "all":
      default:
        sortOption = {}; // No specific sorting
        break;
    }

    // Calculate total products and total pages
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNum);

    // Fetch paginated and sorted results
    const products = await Product.find(filter)
      .populate("category")
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // Respond with results
    res.status(200).json({
      success: true,
      message: "Products search, filter, and sort successful",
      data: {
        products: products,
        pagination: {
          totalProducts: totalProducts,
          currentPage: pageNum,
          totalPages: totalPages,
          limit: limitNum,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during product search, filter, and sort",
      error,
    });
  }
};
