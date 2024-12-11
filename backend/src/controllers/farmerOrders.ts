import { NextFunction, Request, Response } from "express";
import Order from "../models/admin.farmer.order";

export const newOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract data from the request body
    const {
      farmer,
      firstName,
      lastName,
      companyName,
      email,
      phone,
      address,
      address2,
      country,
      zipCode,
      city,
      subtotal,
      shipping,
      total,
      orderItems,
    } = req.body;

    // Ensure all required fields are provided
    if (
      !farmer ||
      !firstName ||
      !lastName ||
      !companyName ||
      !email ||
      !phone ||
      !address ||
      !address2 ||
      !country ||
      !zipCode ||
      !city ||
      !subtotal ||
      !shipping ||
      !total ||
      !orderItems
    ) {
      return res.status(400).json({
        error: "Please provide all required fields",
      });
    }

    const order = new Order({
      farmer,
      firstName,
      lastName,
      companyName,
      email,
      phone,
      address,
      address2,
      country,
      zipCode,
      city,
      subtotal,
      shipping,
      total,
      orderItems,
    });

    // Save the product to the database

    const savedOrder = await order.save();
    console.log("savedOrder", savedOrder);

    // Return the saved product as the response
    res.status(201).json({
      newOrder: savedOrder,
      message: "Order created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
