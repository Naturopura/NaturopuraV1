import Product from '../models/admin.farmer.model';
import { Response, Request, NextFunction } from 'express';

async function getProductsByFarmer(req: Request, res: Response, next: NextFunction): Promise<any> {
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
      return res.status(404).json({ message: "No products found for this farmer." });
    }

    // Return the products as the response
    res.status(200).json(farmerProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default getProductsByFarmer;
