import { Request, Response, Router } from "express";
import { adminLogin, adminSignup } from "../controllers/auth";

import Joi from "joi";
import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";
const router: Router = Router();
router.post(
  "/admin/signup",
  async (req: Request, res: Response): Promise<any> => {
    const {
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
    } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
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
        name,
        role,
        email,
        phone,
        isActive,
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
