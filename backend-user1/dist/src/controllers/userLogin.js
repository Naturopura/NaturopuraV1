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
exports.userLogin = void 0;
const ApiResponse_1 = __importDefault(require("../../helper/ApiResponse"));
const responses_1 = require("../responses");
const crypto_1 = __importDefault(require("crypto"));
const web3_1 = __importDefault(require("web3"));
const redis_1 = require("./redis");
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletAddress, nonce, signature } = req.body;
    const lowerCaseWalletAddress = walletAddress.toLowerCase(); // Ensure wallet address is always in lowercase
    console.log("Received walletAddress:", walletAddress);
    console.log("Received nonce:", nonce);
    console.log("Received signature:", signature);
    try {
        // Scenario 1: If only walletAddress is provided (Generate and send nonce)
        if (!signature && !nonce) {
            console.log("No signature or nonce provided. Generating nonce...");
            const randomNonce = crypto_1.default.randomInt(100000, 999999); // Random 6-digit nonce
            console.log("Generated nonce:", randomNonce);
            yield redis_1.redisClient.set(lowerCaseWalletAddress, randomNonce.toString(), { EX: 300 }); // Increased expiration time to 5 minutes
            console.log("Stored nonce in Redis for walletAddress:", lowerCaseWalletAddress);
            // Send the generated nonce to the client
            return res.status(200).json(ApiResponse_1.default.success("Nonce generated", { nonce: randomNonce }));
        }
        // Scenario 2: If signature, nonce, and walletAddress are all provided (Verify signature)
        if (signature && nonce && walletAddress) {
            console.log("Signature, nonce, and walletAddress received. Verifying...");
            // Fetch the nonce from Redis
            const cachedNonce = yield redis_1.redisClient.get(lowerCaseWalletAddress);
            console.log("Cached nonce for walletAddress", lowerCaseWalletAddress, ":", cachedNonce);
            // If nonce does not match or is expired, return an error
            if (!cachedNonce) {
                console.error("No nonce found in Redis. It may have expired.");
                return res.status(400).json(ApiResponse_1.default.error("Nonce mismatch or expired", responses_1.ResponseDefinitions.SignatureError.code));
            }
            if (cachedNonce !== nonce.toString()) {
                console.error("Nonce mismatch. Expected:", cachedNonce, "but received:", nonce);
                return res.status(400).json(ApiResponse_1.default.error("Nonce mismatch or expired", responses_1.ResponseDefinitions.SignatureError.code));
            }
            // Recreate the message that was signed by the user (should match frontend message)
            const message = `Please sign this message to authenticate: ${nonce}`;
            console.log("Message to be signed:", message);
            // Verify the signature using web3.js
            const web3 = new web3_1.default();
            const recoveredAddress = web3.eth.accounts.recover(message, signature);
            console.log("Recovered address from signature:", recoveredAddress);
            // If recovered address doesn't match the provided wallet address, return an error
            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                console.error("Recovered address does not match provided wallet address. Recovered:", recoveredAddress, "Provided:", walletAddress);
                return res.status(400).json(ApiResponse_1.default.error(responses_1.ResponseDefinitions.SignatureError.message, responses_1.ResponseDefinitions.SignatureError.code));
            }
            // Signature verification successful, return success response
            console.log("Signature verified successfully. Authentication successful.");
            return res.status(200).json(ApiResponse_1.default.success(responses_1.ResponseDefinitions.OperationSuccessful.message, {
                message: "Successfully authenticated with wallet.",
                walletAddress: walletAddress,
            }, responses_1.ResponseDefinitions.OperationSuccessful.code));
        }
        // If none of the conditions match, return an invalid request response
        console.error("Invalid request. Signature, nonce, or walletAddress missing.");
        return res.status(400).json(ApiResponse_1.default.error("Invalid request", responses_1.ResponseDefinitions.InvalidRequest.code));
    }
    catch (error) {
        console.error("Error in userLogin:", error);
        return res.status(500).json(ApiResponse_1.default.error(responses_1.ResponseDefinitions.InternalError.message, responses_1.ResponseDefinitions.InternalError.code));
    }
});
exports.userLogin = userLogin;
