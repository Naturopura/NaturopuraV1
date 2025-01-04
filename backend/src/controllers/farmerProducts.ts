import Product from "../models/admin.farmer.product";
import Admin from "../models/admin.model";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticateToken"; // Adjust this import path as necessary
import Category from "../models/admin.farmer.category";

export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, image } = req.body;

    // Validate the request
    if (!name || !image) {
      res.status(400).json({ error: "Please provide both name and image." });
      return;
    }

    // Validate that image is a Base64 string
    const isBase64 = (str: string) => {
      const base64Regex = /^data:image\/\w+;base64,/;
      return base64Regex.test(str);
    };

    if (!isBase64(image)) {
      res.status(400).json({ error: "Invalid image format." });
      return;
    }

    // Remove Base64 metadata
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400).json({ error: "Category name must be unique." });
      return;
    }

    // Create a new category
    const category = new Category({
      name,
      image: Buffer.from(base64Data, "base64"), // Convert Base64 image to binary buffer
    });

    // Save to database
    const savedCategory = await category.save();

    // Return success response
    res.status(201).json({
      message: "Category created successfully.",
      category: savedCategory,
    });
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

export const getProductsByCategory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { categoryId } = req.query;
  // console.log("Received Category ID:", req.query.categoryId);

  if (!categoryId) {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    const products = await Product.find({ category: categoryId })
      .populate("category")
      .exec();
    console.log("Category ID:", categoryId);
    console.log("Fetched Products:", products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const listProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract data from the request body
    const {
      name,
      category,
      price,
      quantity,
      description,
      unit,
      image,
      currency,
    } = req.body;
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
      !unit ||
      !currency
    ) {
      return res.status(400).json({
        error:
          "Please provide all required fields: name, category, price, quantity, and image.",
      });
    }

    // Check if the farmer exists
    console.log("Checking if farmer exists...");
    const farmerExists = await Admin.findById(farmerId);
    console.log("here is farmerid", farmerExists);
    if (!farmerExists) {
      return res.status(404).json({ error: "Farmer does not exist." });
    }

    console.log("Fetching category details...");
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ error: "Category does not exist." });
    }

    // Create a new product using the Product model
    const newProduct = new Product({
      farmerId,
      name,
      category: categoryExists._id,
      price,
      quantity,
      unit,
      description,
      image,
      currency,
    });

    // Save the product to the database
    console.log("Saving product to database...");
    const savedProduct = await newProduct.save();

    // Return the saved product as the response
    res.status(201).json({
      message: "Product listed successfully.",
      product: savedProduct,
      category: categoryExists,
    });
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
    console.log("------------------------------");
    const farmerProducts = await Product.find({ farmerId })
      .populate("category")
      .exec();

    console.log("farmerProducts", farmerProducts);

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

export const getProductsByCategoryAndPagination = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { page = 1, limit = 10, categoryId } = req.query;

    // Parse page and limit to numbers
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Build the query conditionally based on categoryId
    const query: any = {};
    if (categoryId) {
      query.category = categoryId;
    }

    // Fetch products with pagination and filtering
    const products = await Product.find(query)
      .populate("category")
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    // Get the total count of products for the given query
    const totalProducts = await Product.countDocuments(query);

    // If no products are found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given criteria." });
    }

    // Return products with pagination metadata
    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalProducts: totalProducts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        limit: limitNumber,
      },
    });
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
      _id,
      name,
      category,
      price,
      quantity,
      description,
      image,
      unit,
      currency,
    } = req.body;
    const farmerId = req.user?.id;
    console.log("Updating product:", _id);

    if (!_id || !farmerId) {
      return res
        .status(400)
        .json({ error: "Please provide both productId and farmerId." });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ error: "The specified category does not exist." });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: _id, farmerId },
      {
        name,
        category: existingCategory._id,
        price,
        quantity,
        description,
        image,
        unit,
        currency,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized to update." });
    }

    res.status(200).json({
      updatedProduct: updatedProduct,
      message: "Product Updated Successfully",
    });
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
