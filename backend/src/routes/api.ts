import { Request, Response, Router } from "express";
import {
  adminLogin,
  adminSignup,
  userLogin,
  userSignup,
} from "../controllers/auth";

import Joi from "joi";
import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";

const router: Router = Router();

router.post(
  "/user/signup",
  async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, email, signature, key, address, isRemember } =
      req.body;

    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      signature: Joi.string().required(),
      key: Joi.string().required(),
      address: Joi.string().required(),
      isRemember: Joi.boolean().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            ResponseDefinitions.InvalidInput.message,
            ResponseDefinitions.InvalidInput.code,
            error.details
          )
        );
    }
    try {
      const response = await userSignup(
        firstName,
        lastName,
        email,
        signature,
        key,
        address,
        isRemember
      );
      return res.status(201).json(response);
    } catch (error) {
      ApiResponse.error(
        ResponseDefinitions.NotFound.message,
        ResponseDefinitions.NotFound.code
      );
    }
  }
);

router.post(
  "/user/login",
  async (req: Request, res: Response): Promise<any> => {
    const { signature, key } = req.body;

    const schema = Joi.object({
      signature: Joi.string().required(),
      key: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            ResponseDefinitions.InvalidInput.message,
            ResponseDefinitions.InvalidInput.code,
            error.details
          )
        );
    }
    try {
      const response = await userLogin(signature, key);
      return res.status(200).json(response);
    } catch (error) {
      ApiResponse.error(
        ResponseDefinitions.NotFound.message,
        ResponseDefinitions.NotFound.code
      );
    }
  }
);

router.post(
  "/admin/signup",
  async (req: Request, res: Response): Promise<any> => {
    const {
      firstName,
      lastName,
      role,
      email,
      signature,
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
    } = req.body;
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      signature: Joi.string().required(),
      nonce: Joi.number(),
      isRemember: Joi.boolean().truthy("true").falsy("false"),
      isActive: Joi.boolean().truthy("true").falsy("false"),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      dialingCode: Joi.string().min(2).required(),
      phone: Joi.string().required(),
      walletAddress: Joi.string().required(),
      addressLine: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipCode: Joi.string().required(),
      role: Joi.string()
        .valid(
          "admin",
          "consumer",
          "farmer",
          "distributors",
          "consultant",
          "agricultural_chemicals",
          "equipment_manufacturers",
          "marketing_agencies",
          "insurance",
          "cold-storage"
        )
        .required(),
    });

    const { error } = schema.validate(req.body);

    console.log(error);

    if (error) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            ResponseDefinitions.InvalidInput.message,
            ResponseDefinitions.InvalidInput.code,
            error.details
          )
        );
    }
    try {
      const response = await adminSignup(
        firstName,
        lastName,
        role,
        email,
        phone,
        isActive,
        nonce,
        signature,
        walletAddress,
        isRemember,
        dialingCode,
        addressLine,
        country,
        state,
        city,
        zipCode
      );

      return res.status(201).json(response);
    } catch (error) {
      console.error("Signup Error:", error);
      return res
        .status(500)
        .json(
          ApiResponse.error(
            ResponseDefinitions.NotFound.message,
            ResponseDefinitions.NotFound.code
          )
        );
    }
  }
);

router.post(
  "/admin/login",
  async (req: Request, res: Response): Promise<any> => {
    const { signature, nonce, walletAddress } = req.body;
    console.log("reqBody:", req.body);

    const schema = Joi.object({
      signature: Joi.string().optional(),
      nonce: Joi.number().optional(),
      walletAddress: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    console.log("error", error);
    console.log("Schema Validation:", schema.validate(req.body));

    if (error) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            ResponseDefinitions.InvalidInput.message,
            ResponseDefinitions.InvalidInput.code,
            error.details
          )
        );
    }
    try {
      const response = await adminLogin(signature, nonce, walletAddress);
      console.log(response);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json(
          ApiResponse.error(
            ResponseDefinitions.NotFound.message,
            ResponseDefinitions.NotFound.code
          )
        );
    }
  }
);

export default router;
