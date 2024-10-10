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
exports.adminSignup = exports.adminLogin = exports.userLogin = exports.userSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const user_model_1 = __importDefault(require("../models/user.model"));
const environment_1 = __importDefault(require("../environment/environment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = __importDefault(require("../../helper/ApiResponse"));
const responses_1 = require("../responses");
// const salt = bcryptjs.genSaltSync(10)
const userSignup = (firstName, lastName, email, signature, key, address, isRemember) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user already exists with the given key
        const user = yield user_model_1.default.findOne({
            key: key,
            deletedAt: { $eq: null },
        });
        if (user) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.UserExist.message, responses_1.ResponseDefinitions.UserExist.code);
        }
        else {
            let hashPass = "";
            // Generate salt and hash password
            return bcryptjs_1.default
                .genSalt(saltRounds)
                .then((salt) => {
                return bcryptjs_1.default.hash(signature, salt);
            })
                .then((hash) => __awaiter(void 0, void 0, void 0, function* () {
                // Create a new user instance
                const customer = new user_model_1.default({
                    firstName: firstName.toLowerCase(),
                    lastName: lastName.toLowerCase(),
                    role: "consumer",
                    email: email.toLowerCase(),
                    signature: hash,
                    key: key,
                    walletAddress: address,
                });
                // Save the user in the database
                yield customer.save();
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
                return ApiResponse_1.default.success("Successfully registered.", Object.assign(Object.assign({ createSuccessResponse: "Successfully registered.", token: isRemember
                        ? jsonwebtoken_1.default.sign(newCustomer, process.env.TOKEN_SECRET || environment_1.default.TOKEN_SECRET, { expiresIn: "48h" })
                        : "" }, newCustomer), { expiresIn: "48h" }));
            }))
                .catch((err) => {
                console.error(err.message);
                return ApiResponse_1.default.error(responses_1.ResponseDefinitions.HashError.message, responses_1.ResponseDefinitions.HashError.code);
            });
        }
    }
    catch (error) {
        // Catch and return any unexpected errors
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code);
    }
});
exports.userSignup = userSignup;
const userLogin = (signature, key) => __awaiter(void 0, void 0, void 0, function* () {
    // const { signature, key } = req.body;
    try {
        const user = yield user_model_1.default.findOne({
            key: key,
            deletedAt: { $eq: null },
            isActive: 1,
        });
        if (!user) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.UserNotExist.message, responses_1.ResponseDefinitions.UserNotExist.code);
        }
        bcryptjs_1.default.compare(signature, user.signature).then((resData) => {
            if (resData) {
                const newCustomer = {
                    isActive: user.isActive,
                    // id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    email: user.email,
                };
                return ApiResponse_1.default.success("Successfully logged in.", Object.assign(Object.assign({ token: jsonwebtoken_1.default.sign(newCustomer, environment_1.default.TOKEN_SECRET, {
                        expiresIn: "48h",
                    }) }, newCustomer), { expiresIn: "48h" }), "USER_LOGIN_SUCCESS");
            }
            else {
                return ApiResponse_1.default.error(responses_1.ResponseDefinitions.SignatureError.message, responses_1.ResponseDefinitions.SignatureError.code);
            }
        });
    }
    catch (error) {
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code);
    }
});
exports.userLogin = userLogin;
const adminLogin = (signature, key) => __awaiter(void 0, void 0, void 0, function* () {
    // const { signature, key } = req.body;
    try {
        const user = yield user_model_1.default.findOne({
            key,
            deletedAt: { $eq: null },
            isActive: 1,
        });
        console.log("userModel", user);
        if (!user) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.UserNotExist.message, responses_1.ResponseDefinitions.UserNotExist.code);
        }
        // if (user.role === "consumer") {
        //   return ApiResponse.error(
        //     "You are not authorized for this endpoint.",
        //     "USER_NOT_AUTHORIZED"
        //   );
        // }
        console.log("Original Signature:", signature);
        console.log("Hashed Signature:", user.signature);
        return yield bcryptjs_1.default
            .compare(signature, user.signature)
            .then((resData) => {
            console.log("resData", resData);
            if (resData) {
                const newCustomer = {
                    isActive: user.isActive,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    email: user.email,
                };
                console.log("newCustomer", newCustomer);
                const successResponse = ApiResponse_1.default.success(responses_1.ResponseDefinitions.OperationSuccessful.message, Object.assign(Object.assign({ createSuccessResponse: "Successfully logged in.", token: jsonwebtoken_1.default.sign(newCustomer, environment_1.default.TOKEN_SECRET, {
                        expiresIn: "48h",
                    }) }, newCustomer), { expiresIn: "48h" }), responses_1.ResponseDefinitions.OperationSuccessful.code);
                console.log("successResponse", successResponse);
                return successResponse;
            }
            else {
                const errorResponse = ApiResponse_1.default.error(responses_1.ResponseDefinitions.SignatureError.message, responses_1.ResponseDefinitions.SignatureError.code);
                console.log("errorResponse", errorResponse);
                return errorResponse;
            }
        });
    }
    catch (error) {
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code);
    }
});
exports.adminLogin = adminLogin;
const adminSignup = (firstName, lastName, role, email, phone, isActive, key, signature, walletAddress, isRemember, dialingCode, addressLine, country, state, city, zipCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            email,
            deletedAt: { $eq: null },
        });
        // console.log("user:", user);
        if (user) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.InvalidInput.message, responses_1.ResponseDefinitions.InvalidInput.code);
        }
        else if (!signature ||
            typeof signature !== "string" ||
            signature.trim() === "") {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.SignatureError.message, responses_1.ResponseDefinitions.SignatureError.code);
        }
        // console.log("Signature:", signature);
        // console.log("Key:", key);
        else
            return yield bcryptjs_1.default
                .genSalt(saltRounds)
                .then((salt) => __awaiter(void 0, void 0, void 0, function* () {
                // console.log("Generated Salt:", salt);
                // console.log(bcryptjs.hash(signature, salt), "Hashed");
                const hashedToken = yield bcryptjs_1.default.hash(signature, salt);
                // console.log("hashedToken", hashedToken);
                return hashedToken;
            }))
                .then((hashedToken) => __awaiter(void 0, void 0, void 0, function* () {
                // console.log("Hashed Signature:", hashedToken);
                const customer = new user_model_1.default({
                    firstName,
                    lastName,
                    role,
                    email,
                    signature: hashedToken,
                    // signature,
                    isActive,
                    isRemember,
                    key,
                    dialingCode,
                    phone,
                    addressLine,
                    country,
                    state,
                    city,
                    zipCode,
                    walletAddress,
                });
                // console.log(signature, "signature");
                // console.log(hashedToken, "hashedToken");
                // console.log(customer, "customer");
                yield customer.save();
                // publishUserRegisteredEvent({
                //   user_id: customer._id,
                //   dialingCode,
                //   phone,
                //   addressLine,
                //   country,
                //   state,
                //   city,
                //   zipCode,
                // });
                const newCustomer = {
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    role: customer.role,
                    email: customer.email,
                    signature: customer.signature,
                    isActive: customer.isActive,
                    isRemember: customer.isRemember,
                    key: customer.key,
                    dialingCode: customer.dialingCode,
                    phone: customer.phone,
                    addressLine: customer.addressLine,
                    country: customer.country,
                    state: customer.state,
                    city: customer.city,
                    zipCode: customer.zipCode,
                    walletAddress: customer.walletAddress,
                };
                // console.log(newCustomer, "newCustomer");
                const responseSuccess = ApiResponse_1.default.success(responses_1.ResponseDefinitions.OperationSuccessful.message, Object.assign(Object.assign({ createSuccessResponse: "Successfully registered.", token: isRemember
                        ? jsonwebtoken_1.default.sign(newCustomer, environment_1.default.TOKEN_SECRET, { expiresIn: "48h" })
                        : "" }, newCustomer), { expiresIn: "48h" }), responses_1.ResponseDefinitions.OperationSuccessful.code);
                // console.log("responseSuccess:", responseSuccess);
                return responseSuccess;
                // console.log("Response ***")
            }))
                .catch((err) => {
                console.log(err, "console");
                return ApiResponse_1.default.error(responses_1.ResponseDefinitions.HashError.message, responses_1.ResponseDefinitions.HashError.code);
            });
    }
    catch (error) {
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code);
        // console.log("responseError", responseError);
    }
});
exports.adminSignup = adminSignup;
