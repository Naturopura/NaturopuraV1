"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrder = void 0;
const admin_farmer_order_1 = __importDefault(require("../models/admin.farmer.order"));
const newOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const { farmer, firstName, lastName, companyName, email, phone, address, address2, country, zipCode, city, subtotal, shipping, total, orderItems, } = req.body;
        // Ensure all required fields are provided
        if (!farmer ||
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
            !orderItems) {
            return res.status(400).json({
                error: "Please provide all required fields",
            });
        }
        const order = new admin_farmer_order_1.default({
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
        const savedOrder = yield order.save();
        console.log("savedOrder", savedOrder);
        // Return the saved product as the response
        res.status(201).json({
            newOrder: savedOrder,
            message: "Order created successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.newOrder = newOrder;
