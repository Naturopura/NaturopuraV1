import bcryptjs from "bcryptjs";
const saltRounds = 10;
import User from "../models/admin.model";
import env from "../environment/environment"; // Assuming you have environment setup
import jwt from "jsonwebtoken";
import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";
import { createClient } from "redis";
import crypto from "crypto";
import Web3 from "web3"; // Import web3.js
import { log } from "console";

const web3 = new Web3(); // Initialize web3 without a provider for signature verification

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

// Connect Redis
(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

export const adminLogin = async (
  signature: string | undefined,
  nonce: number | undefined,
  walletAddress: string
) => {
  console.log(walletAddress, nonce, signature, "here is wallet");
  try {
    // Scenario 1: If only walletAddress is provided
    if (!signature && !nonce) {
      const user = await User.findOne({
        walletAddress,
        deletedAt: { $eq: null },
        isActive: 1,
      });

      if (!user) {
        return ApiResponse.error(
          ResponseDefinitions.UserNotExist.message,
          ResponseDefinitions.UserNotExist.code
        );
      }

      // Generate a random nonce
      const randomNonce = crypto.randomInt(100000, 999999); // Random 6-digit nonce

      // Store nonce in Redis with 1-minute expiration
      await redisClient.set(walletAddress, randomNonce.toString(), { EX: 60 }); // EX sets expiration to 60 seconds
      console.log(walletAddress, "setting wallet address");

      // Send the generated nonce to the frontend
      return ApiResponse.success("Nonce generated", { nonce: randomNonce });
    }

    // Scenario 2: If signature, nonce, and walletAddress are all provided
    if (signature && nonce && walletAddress) {
      // Fetch the nonce from Redis
      const cachedNonce = await redisClient.get(walletAddress);
      console.log(walletAddress, "got the available wallet address");

      if (!cachedNonce || cachedNonce !== nonce.toString()) {
        return ApiResponse.error(
          "Nonce mismatch or expired",
          ResponseDefinitions.SignatureError.code
        );
      }

      // Recreate the message that was signed by the user
      // Backend: Change message to match frontend
      const message = `Please sign this message to authenticate: ${nonce}`;
      // Message signed by the wallet

      // Verify the signature using web3.js
      const recoveredAddress = web3.eth.accounts.recover(message, signature);

      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return ApiResponse.error(
          ResponseDefinitions.SignatureError.message,
          ResponseDefinitions.SignatureError.code
        );
      }

      // Fetch user from the database
      const user = await User.findOne({
        walletAddress,
        deletedAt: { $eq: null },
        isActive: 1,
      });
      console.log(user, "got the user");

      if (!user) {
        return ApiResponse.error(
          ResponseDefinitions.UserNotExist.message,
          ResponseDefinitions.UserNotExist.code
        );
      }

      const userData = {
        id: user._id,
        isActive: user.isActive,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      };

      // Generate a JWT for the user
      const token = jwt.sign(userData, process.env.TOKEN_SECRET || "QUOTUS", {
        expiresIn: "48h",
      });

      // Return a successful login response with the JWT token
      return ApiResponse.success(
        ResponseDefinitions.OperationSuccessful.message,
        {
          message: "Successfully logged in.",
          token: token,
          expiresIn: "48h",
          ...userData,
        },
        ResponseDefinitions.OperationSuccessful.code
      );
    }

    // If none of the conditions match, return an invalid request response
    return ApiResponse.error(
      "Invalid request",
      ResponseDefinitions.InvalidRequest.code
    );
  } catch (error) {
    console.error("Error in adminLogin:", error);
    return ApiResponse.error(
      ResponseDefinitions.InternalError.message,
      ResponseDefinitions.InternalError.code
    );
  }
};

export const adminSignup = async (
  name: any,
  role: any,
  email: any,
  phone: any,
  isActive: any,
  walletAddress: any,
  isRemember: any,
  dialingCode: any,
  addressLine: any,
  country: any,
  state: any,
  city: any,
  zipCode: any
) => {
  try {
    // Check if email or phone already exists in the database
    const existingUser = await User.findOne({
      $or: [
        { email, deletedAt: { $eq: null } },
        { phone, deletedAt: { $eq: null } },
      ],
    });

    if (existingUser) {
      return ApiResponse.error(
        "Email or phone number already exists",
        ResponseDefinitions.InvalidInput.code
      );
    }

    const customer = new User({
      name,
      role,
      email,
      isActive,
      isRemember,
      dialingCode,
      phone,
      addressLine,
      country,
      state,
      city,
      zipCode,
      walletAddress,
    });

    await customer.save();

    const newCustomer = {
      id: customer._id,
      role: customer.role,
      email: customer.email,
      isRemember: customer.isRemember,
      walletAddress: customer.walletAddress,
    };

    console.log(customer._id, "gggggggg");

    const responseSuccess = ApiResponse.success(
      ResponseDefinitions.OperationSuccessful.message,
      {
        createSuccessResponse: "Successfully registered.",
        token: isRemember
          ? jwt.sign(newCustomer, env.TOKEN_SECRET, { expiresIn: "48h" })
          : "",
        ...newCustomer,
        expiresIn: "48h",
      },
      ResponseDefinitions.OperationSuccessful.code
    );

    return responseSuccess;
  } catch (error) {
    console.error("Error in adminSignup:", error);
    return ApiResponse.error(
      ResponseDefinitions.NotFound.message,
      ResponseDefinitions.NotFound.code
    );
  }
};
