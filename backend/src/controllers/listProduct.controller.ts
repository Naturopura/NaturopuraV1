import Product from '../models/admin.farmer.model'; // Adjust this import based on your structure
import { Response, Request, NextFunction } from 'express';

async function listProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    // Extract data from the request body
    const { farmerId, name, category, price, quantity, description, image, unit } = req.body;
    console.log("got the request", farmerId);

    // Ensure all required fields are provided
    if (!farmerId || !name || !category || !price || !quantity || !image || !unit) {
      return res.status(400).json({ error: "Please provide all required fields: farmerId, name, category, price, quantity, and image." });
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
      image,  // Assuming image is being sent as Buffer in the request body
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Return the saved product as the response
    res.status(201).json(savedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default listProduct;
