import Product from "../models/admin.farmer.product";
import Admin from "../models/admin.model";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticateToken"; // Adjust this import path as necessary
import Category from "../models/admin.farmer.category";
import { FileUploader } from "./imageUpload";

export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name } = req.body;

    const image = req.file?.fieldname;
    const imagePath = req.file?.path;

    // Validate the request
    if (!name || !image || !imagePath) {
      return res
        .status(400)
        .json({ error: "Please provide both name and image." });
    }

    const uploader = new FileUploader();
    const filePath = imagePath;
    const fileName = image;

    const result = await uploader.uploadFile({ filePath, fileName });

    const { secure_url, public_id } = result;

    if (!secure_url) {
      return res.status(400).json({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400).json({ error: "Category name must be unique." });
      return;
    }

    // Create a new category
    const category = new Category({
      name,
      image: public_id, // Convert Base64 image to binary buffer
    });

    // Save to database
    const savedCategory = await category.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: {
        ...savedCategory.toObject(),
        image: secure_url,
      },
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

    // Initialize the FileUploader instance
    const fileUploader = new FileUploader();

    // Get the secure URL for each product image
    const categoriesWithSecureUrl = await Promise.all(
      categories.map(async (category) => {
        const secureUrl = await fileUploader.getSecureUrlFromPublicId(
          category.image
        );
        return {
          ...category.toObject(), // Convert product to plain object
          image: secureUrl, // Replace public_id with secure_url
        };
      })
    );

    // Return the list of categories
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      data: categoriesWithSecureUrl,
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
    // Extract data from request body
    const { name, category, price, quantity, description, unit, currency } =
      req.body;
    console.log("Request File: ", req.file);

    const image = req.file?.fieldname;
    const imagePath = req.file?.path;

    const farmerId = req.user?.id; // Use req.user from AuthenticatedRequest

    if (
      !farmerId ||
      !name ||
      !category ||
      !price ||
      !quantity ||
      !unit ||
      !currency ||
      !image ||
      !imagePath
    ) {
      return res.status(400).json({
        error:
          "Please provide all required fields: name, category, price, quantity, and image.",
      });
    }

    const uploader = new FileUploader();
    const filePath = imagePath;
    const fileName = image;

    // Call the uploadFile method to get the file's secure_url and public_id
    const result = await uploader.uploadFile({ filePath, fileName });

    const { secure_url, public_id } = result;

    if (!secure_url) {
      return res.status(400).json({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }

    console.log("Request File", req.file);

    // Check if the farmer exists
    const farmerExists = await Admin.findById(farmerId);
    if (!farmerExists) {
      return res.status(404).json({ error: "Farmer does not exist." });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ error: "Category does not exist." });
    }

    const newProduct = new Product({
      farmerId,
      name,
      category: categoryExists._id,
      price,
      quantity,
      unit,
      description,
      image: public_id,
      currency,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product listed successfully.",
      data: {
        ...savedProduct.toObject(),
        image: secure_url, // Replace public_id with secure_url in the response
      },
    });
  } catch (error: any) {
    console.error("Error in listing product:", error);
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

    // Initialize the FileUploader instance
    const fileUploader = new FileUploader();

    // Get the secure URL for each product image
    const productsWithSecureUrl = await Promise.all(
      products.map(async (product) => {
        const secureUrl = await fileUploader.getSecureUrlFromPublicId(
          product.image
        );
        return {
          ...product.toObject(), // Convert product to plain object
          image: secureUrl, // Replace public_id with secure_url
        };
      })
    );

    // Return products with pagination metadata
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: {
        products: productsWithSecureUrl,
        pagination: {
          totalProducts: totalProducts,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalProducts / limitNumber),
          limit: limitNumber,
        },
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
      unit,
      currency,
    } = req.body;
    // const farmerId = req.user?.id;
    console.log("Updating product:", _id);

    const image = req.file?.fieldname!;
    const imagePath = req.file?.path!;

    if (
      !_id ||
      !name ||
      !category ||
      !price ||
      !quantity ||
      !unit ||
      !currency ||
      !image ||
      !imagePath
    ) {
      return res.status(400).json({ error: "Please provide all fields." });
    }

    const uploader = new FileUploader();
    const filePath = imagePath;
    const fileName = image;

    // Call the uploadFile method to get the file's secure_url and public_id
    const result = await uploader.uploadFile({ filePath, fileName });

    const { secure_url, public_id } = result;

    if (!secure_url) {
      return res.status(400).json({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ error: "The specified category does not exist." });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: _id,
        // farmerId
      },
      {
        name,
        category: existingCategory._id,
        price,
        quantity,
        description,
        image: public_id,
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
      success: true,
      message: "Product Updated Successfully",
      data: {
        ...updatedProduct.toObject(),
        image: secure_url,
      },
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
