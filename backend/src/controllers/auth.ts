import bcryptjs from "bcryptjs";
const saltRounds = 10;
import User from "../models/admin.model";
<<<<<<< HEAD
import env from "../environment/environment"; 
=======
import env from "../environment/environment"; // Assuming you have environment setup
>>>>>>> rakesh-bin
import jwt from "jsonwebtoken";
import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";
import { createClient } from "redis";
import crypto from "crypto";
import Web3 from "web3"; // Import web3.js

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
<<<<<<< HEAD
      console.log(walletAddress,"setting wallet address");
=======
      console.log(walletAddress, "setting wallet address");
>>>>>>> rakesh-bin

      // Send the generated nonce to the frontend
      return ApiResponse.success("Nonce generated", { nonce: randomNonce });
    }

    // Scenario 2: If signature, nonce, and walletAddress are all provided
    if (signature && nonce && walletAddress) {
      // Fetch the nonce from Redis
      const cachedNonce = await redisClient.get(walletAddress);
<<<<<<< HEAD
      console.log(walletAddress,"got the available wallet address");
=======
      console.log(walletAddress, "got the available wallet address");
>>>>>>> rakesh-bin

      if (!cachedNonce || cachedNonce !== nonce.toString()) {
        return ApiResponse.error(
          "Nonce mismatch or expired",
          ResponseDefinitions.SignatureError.code
        );
      }

      // Recreate the message that was signed by the user
      // Backend: Change message to match frontend
<<<<<<< HEAD
const message = `Please sign this message to authenticate: ${nonce}`;
// Message signed by the wallet
=======
      const message = `Please sign this message to authenticate: ${nonce}`;
      // Message signed by the wallet
>>>>>>> rakesh-bin

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

      if (!user) {
        return ApiResponse.error(
          ResponseDefinitions.UserNotExist.message,
          ResponseDefinitions.UserNotExist.code
        );
      }

      const userData = {
        isActive: user.isActive,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      };

      // Generate a JWT for the user
<<<<<<< HEAD
      const token = jwt.sign(userData, process.env.TOKEN_SECRET || "QUOTUS", { expiresIn: "48h" });
=======
      const token = jwt.sign(userData, process.env.TOKEN_SECRET || "QUOTUS", {
        expiresIn: "48h",
      });
>>>>>>> rakesh-bin

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

<<<<<<< HEAD

// export const adminLogin = async (signature: string, nonce: Number, walletAddress: string) => {
//   // const { signature, key } = req.body;
//   try {
//     const user = await User.findOne({
//       walletAddress: walletAddress,
//       deletedAt: { $eq: null },
//       isActive: 1,
//     });
//     console.log("userModel", user);

//     if (!user) {
//       return ApiResponse.error(
//         ResponseDefinitions.UserNotExist.message,
//         ResponseDefinitions.UserNotExist.code
//       );
//     }

//     // if (user.role === "consumer") {
//     //   return ApiResponse.error(
//     //     "You are not authorized for this endpoint.",
//     //     "USER_NOT_AUTHORIZED"
//     //   );
//     // }
   
//     return await bcryptjs
//       .compare(signature, user.signature)
//       .then((resData: boolean) => {
//         console.log("resData", resData);

//         if (resData) {
//           const newCustomer = {
//             isActive: user.isActive,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             role: user.role,
//             email: user.email,
//           };
//           console.log("newCustomer", newCustomer);

//           const successResponse = ApiResponse.success(
//             ResponseDefinitions.OperationSuccessful.message,
//             {
//               createSuccessResponse: "Successfully logged in.",
//               token: jwt.sign(newCustomer, env.TOKEN_SECRET, {
//                 expiresIn: "48h",
//               }),
//               ...newCustomer,
//               expiresIn: "48h",
//             },
//             ResponseDefinitions.OperationSuccessful.code
//           );
//           console.log("successResponse", successResponse);
//           return successResponse;
//         } else {
//           const errorResponse = ApiResponse.error(
//             ResponseDefinitions.SignatureError.message,
//             ResponseDefinitions.SignatureError.code
//           );
//           console.log("errorResponse", errorResponse);
//           return errorResponse;
//         }
//       });
//   } catch (error) {
//     return ApiResponse.error(
//       ResponseDefinitions.NotFound.message,
//       ResponseDefinitions.NotFound.code
//     );
//   }
// };

export const adminSignup = async (
  firstName: any,
  lastName: any,
=======
export const adminSignup = async (
  name: any,
>>>>>>> rakesh-bin
  role: any,
  email: any,
  phone: any,
  isActive: any,
  nonce: any,
  signature: any,
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
<<<<<<< HEAD
        { phone, deletedAt: { $eq: null } }
=======
        { phone, deletedAt: { $eq: null } },
>>>>>>> rakesh-bin
      ],
    });

    if (existingUser) {
      return ApiResponse.error(
        "Email or phone number already exists",
        ResponseDefinitions.InvalidInput.code
      );
    } else if (
      !signature ||
      typeof signature !== "string" ||
      signature.trim() === ""
    ) {
      return ApiResponse.error(
        ResponseDefinitions.SignatureError.message,
        ResponseDefinitions.SignatureError.code
      );
    }

    return await bcryptjs
      .genSalt(saltRounds)
      .then(async (salt: string) => {
        const hashedToken = await bcryptjs.hash(signature, salt);
        return hashedToken;
      })
      .then(async (hashedToken) => {
        const customer = new User({
<<<<<<< HEAD
          firstName,
          lastName,
=======
          name,
>>>>>>> rakesh-bin
          role,
          email,
          signature: hashedToken,
          isActive,
          isRemember,
          nonce,
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
<<<<<<< HEAD
          firstName: customer.firstName,
          lastName: customer.lastName,
          role: customer.role,
          email: customer.email,
          signature: customer.signature,
          isActive: customer.isActive,
          isRemember: customer.isRemember,
          nonce: customer.nonce,
          dialingCode: customer.dialingCode,
          phone: customer.phone,
          addressLine: customer.addressLine,
          country: customer.country,
          state: customer.state,
          city: customer.city,
          zipCode: customer.zipCode,
=======
          id: customer._id,
          role: customer.role,
          email: customer.email,
          isRemember: customer.isRemember,
>>>>>>> rakesh-bin
          walletAddress: customer.walletAddress,
        };

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
      })
      .catch((err: any) => {
        console.log(err, "console");
        return ApiResponse.error(
          ResponseDefinitions.HashError.message,
          ResponseDefinitions.HashError.code
        );
      });
  } catch (error) {
    return ApiResponse.error(
      ResponseDefinitions.NotFound.message,
      ResponseDefinitions.NotFound.code
    );
  }
};
<<<<<<< HEAD

export const userSignup = async (
  firstName: any,
  lastName: any,
  email: any,
  signature: any,
  key: any,
  address: any,
  isRemember: any
) => {
  try {
    // Check if user already exists with the given key
    const user = await User.findOne({
      key: key,
      deletedAt: { $eq: null },
    });

    if (user) {
      return ApiResponse.error(
        ResponseDefinitions.UserExist.message,
        ResponseDefinitions.UserExist.code
      );
    } else {
      let hashPass: string = "";

      // Generate salt and hash password
      return bcryptjs
        .genSalt(saltRounds)
        .then((salt: string) => {
          return bcryptjs.hash(signature, salt);
        })
        .then(async (hash: string) => {
          // Create a new user instance
          const customer = new User({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            role: "consumer",
            email: email.toLowerCase(),
            signature: hash,
            key: key,
            walletAddress: address,
          });

          // Save the user in the database
          await customer.save();

          // Construct response object for the newly created user
          const newCustomer = {
            isActive: customer.isActive,
            // id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            role: customer.role,
            email: customer.email,
          };

          // Return success response
          return ApiResponse.success("Successfully registered.", {
            createSuccessResponse: "Successfully registered.",
            token: isRemember
              ? jwt.sign(
                  newCustomer,
                  process.env.TOKEN_SECRET || env.TOKEN_SECRET,
                  { expiresIn: "48h" }
                )
              : "",
            ...newCustomer,
            expiresIn: "48h",
          });
        })
        .catch((err: any) => {
          console.error(err.message);
          return ApiResponse.error(
            ResponseDefinitions.HashError.message,
            ResponseDefinitions.HashError.code
          );
        });
    }
  } catch (error) {
    // Catch and return any unexpected errors
    return ApiResponse.error(
      ResponseDefinitions.NotFound.message,
      ResponseDefinitions.NotFound.code
    );
  }
};

export const userLogin = async (signature: any, key: any) => {
  // const { signature, key } = req.body;

  try {
    const user = await User.findOne({
      key: key,
      deletedAt: { $eq: null },
      isActive: 1,
    });

    if (!user) {
      return ApiResponse.error(
        ResponseDefinitions.UserNotExist.message,
        ResponseDefinitions.UserNotExist.code
      );
    }

    bcryptjs.compare(signature, user.signature).then((resData: boolean) => {
      if (resData) {
        const newCustomer = {
          isActive: user.isActive,
          // id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
        };
        return ApiResponse.success(
          "Successfully logged in.",
          {
            token: jwt.sign(newCustomer, env.TOKEN_SECRET, {
              expiresIn: "48h",
            }),
            ...newCustomer,
            expiresIn: "48h",
          },
          "USER_LOGIN_SUCCESS"
        );
      } else {
        return ApiResponse.error(
          ResponseDefinitions.SignatureError.message,
          ResponseDefinitions.SignatureError.code
        );
      }
    });
  } catch (error) {
    return ApiResponse.error(
      ResponseDefinitions.NotFound.message,
      ResponseDefinitions.NotFound.code
    );
  }
};
=======
>>>>>>> rakesh-bin
