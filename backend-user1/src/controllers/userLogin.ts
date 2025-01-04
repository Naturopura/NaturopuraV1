import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";
import crypto from "crypto";
import Web3 from "web3";
import { NextFunction, Request, Response } from "express";
import { redisClient } from "./redis";
import jwt from "jsonwebtoken";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { walletAddress, nonce, signature } = req.body;
  const lowerCaseWalletAddress = walletAddress.toLowerCase(); // Ensure wallet address is always in lowercase
  console.log("Received walletAddress:", walletAddress);
  console.log("Received nonce:", nonce);
  console.log("Received signature:", signature);

  try {
    // Scenario 1: If only walletAddress is provided (Generate and send nonce)
    if (!signature && !nonce) {
      console.log("No signature or nonce provided. Generating nonce...");

      const randomNonce = crypto.randomInt(100000, 999999); // Random 6-digit nonce
      console.log("Generated nonce:", randomNonce);

      await redisClient.set(lowerCaseWalletAddress, randomNonce.toString(), {
        EX: 300,
      }); // Increased expiration time to 5 minutes
      console.log(
        "Stored nonce in Redis for walletAddress:",
        lowerCaseWalletAddress
      );

      // Send the generated nonce to the client
      return res
        .status(200)
        .json(ApiResponse.success("Nonce generated", { nonce: randomNonce }));
    }

    // Scenario 2: If signature, nonce, and walletAddress are all provided (Verify signature)
    if (signature && nonce && walletAddress) {
      console.log("Signature, nonce, and walletAddress received. Verifying...");

      // Fetch the nonce from Redis
      const cachedNonce = await redisClient.get(lowerCaseWalletAddress);
      console.log(
        "Cached nonce for walletAddress",
        lowerCaseWalletAddress,
        ":",
        cachedNonce
      );

      // If nonce does not match or is expired, return an error
      if (!cachedNonce) {
        console.error("No nonce found in Redis. It may have expired.");
        return res
          .status(400)
          .json(
            ApiResponse.error(
              "Nonce mismatch or expired",
              ResponseDefinitions.SignatureError.code
            )
          );
      }

      if (cachedNonce !== nonce.toString()) {
        console.error(
          "Nonce mismatch. Expected:",
          cachedNonce,
          "but received:",
          nonce
        );
        return res
          .status(400)
          .json(
            ApiResponse.error(
              "Nonce mismatch or expired",
              ResponseDefinitions.SignatureError.code
            )
          );
      }

      // Recreate the message that was signed by the user (should match frontend message)
      const message = `Please sign this message to authenticate: ${nonce}`;
      console.log("Message to be signed:", message);

      // Verify the signature using web3.js
      const web3 = new Web3();
      const recoveredAddress = web3.eth.accounts.recover(message, signature);
      console.log("Recovered address from signature:", recoveredAddress);

      // If recovered address doesn't match the provided wallet address, return an error
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        console.error(
          "Recovered address does not match provided wallet address. Recovered:",
          recoveredAddress,
          "Provided:",
          walletAddress
        );
        return res
          .status(400)
          .json(
            ApiResponse.error(
              ResponseDefinitions.SignatureError.message,
              ResponseDefinitions.SignatureError.code
            )
          );
      }

      const tokenPayload = {
        id: crypto.randomUUID(), // Use a unique identifier for the user
        walletAddress: lowerCaseWalletAddress,
      };

      const token = jwt.sign(
        tokenPayload,
        process.env.TOKEN_SECRET! || "QUOTUS",
        { expiresIn: "48h" }
      );

      // Signature verification successful, return success response
      console.log(
        "Signature verified successfully. Authentication successful."
      );
      return res.status(200).json(
        ApiResponse.success(
          ResponseDefinitions.OperationSuccessful.message,
          {
            message: "Successfully authenticated with wallet.",
            walletAddress: walletAddress,
            token: token,
          },
          ResponseDefinitions.OperationSuccessful.code
        )
      );
    }

    // If none of the conditions match, return an invalid request response
    console.error(
      "Invalid request. Signature, nonce, or walletAddress missing."
    );
    return res
      .status(400)
      .json(
        ApiResponse.error(
          "Invalid request",
          ResponseDefinitions.InvalidRequest.code
        )
      );
  } catch (error) {
    console.error("Error in userLogin:", error);
    return res
      .status(500)
      .json(
        ApiResponse.error(
          ResponseDefinitions.InternalError.message,
          ResponseDefinitions.InternalError.code
        )
      );
  }
};
