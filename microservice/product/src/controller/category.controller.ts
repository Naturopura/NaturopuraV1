import { Request, Response } from "express";
import env from "../environment/environment";
import {
  createErrorResponse,
  createSuccessResponse,
  getPayloadFromToken,
} from "../utility/helper/helper";
import productCategory from "../model/product.category";
import equipmentCategory from "../model/equipment.category";
import chemicalCategory from "../model/chemical.category";

const Joi = require("joi");

export const createCategory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    recommendedStorageConditions,
    shelfLifeIndDays,
    harvestingSeason,
  } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(250).required(),
    recommendedStorageConditions: Joi.string()
      .valid(
        "coolAndDryPlace",
        "refrigerated",
        "roomTemperature",
        "freezer",
        "dryPantry",
        "airtightContainer",
        "keepAwayFromDirectSunlight",
        "humidityControlled",
        "storeInOriginalPackaging",
        "avoidTemperatureFluctuations",
        "doNotFreeze",
        "storeInDarkPlace",
        "keepUpright",
        "handleWithCare"
      )
      .required(),
    shelfLifeIndDays: Joi.number().required(),
    harvestingSeason: Joi.string()
      .valid(
        "spring",
        "summer",
        "fall",
        "winter",
        "year-round",
        "earlySpring",
        "lateSpring",
        "earlySummer",
        "lateSummer",
        "earlyFall",
        "lateFall",
        "earlyWinter",
        "lateWinter"
      )
      .required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "INVALID_INPUT",
          "Invalid input provided.",
          error.details
        )
      );
  } else {
    try {
      const payload = getPayloadFromToken(req);
      const category = await productCategory.create({
        name,
        description,
        recommendedStorageConditions,
        shelfLifeIndDays,
        harvestingSeason,
        createdBy: payload.id,
      });

      return res
        .status(201)
        .json(createSuccessResponse("category created successfully", ""));
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_CRETE_CATEGORY",
            "cant able to create the table",
            {}
          )
        );
    }
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    recommendedStorageConditions,
    shelfLifeIndDays,
    harvestingSeason,
    id,
  } = req.body;

  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(250),
    recommendedStorageConditions: Joi.string().valid(
      "coolAndDryPlace",
      "refrigerated",
      "roomTemperature",
      "freezer",
      "dryPantry",
      "airtightContainer",
      "keepAwayFromDirectSunlight",
      "humidityControlled",
      "storeInOriginalPackaging",
      "avoidTemperatureFluctuations",
      "doNotFreeze",
      "storeInDarkPlace",
      "keepUpright",
      "handleWithCare"
    ),
    shelfLifeIndDays: Joi.number(),
    harvestingSeason: Joi.string().valid(
      "spring",
      "summer",
      "fall",
      "winter",
      "year-round",
      "earlySpring",
      "lateSpring",
      "earlySummer",
      "lateSummer",
      "earlyFall",
      "lateFall",
      "earlyWinter",
      "lateWinter"
    ),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "INVALID_INPUT",
          "Invalid input provided.",
          error.details
        )
      );
  } else {
    const category = await productCategory.findOne({
      where: { id: id, deletedAt: null },
    });
    if (!category) {
      return res
        .status(404)
        .json(createErrorResponse("RECORD_NOT_EXIT", "Record is not exit."));
    }

    try {
      const payload = getPayloadFromToken(req);
      await productCategory.update(
        {
          name,
          description,
          recommendedStorageConditions,
          shelfLifeIndDays,
          harvestingSeason,
          updatedBy:payload?.id
        },
        { where: { id: id } }
      );
      return res
        .status(200)
        .json(createSuccessResponse("category update successfully", ""));
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_UPDATE_CATEGORY",
            "cant able to update the table",
            {}
          )
        );
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  const category = await productCategory.findOne({
    where: { id: categoryId, deletedAt: null },
  });

  if (!category) {
    return res
      .status(404)
      .json(createErrorResponse("RECORD_NOT_EXIT", "Record is not exit."));
  } else {
    try {
      const payload = getPayloadFromToken(req);
      await productCategory.update(
        { deletedAt: new Date() },
        { where: { id: categoryId, deletedAt: null,updatedBy:payload?.id } }
      );
      return res
        .status(200)
        .json(createSuccessResponse("category deleted successfully", ""));
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_DELETE_CATEGORY",
            "cant able to delete the table",
            {}
          )
        );
    }
  }
};

export const createEquipmentCategory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    recommendedUse,
    power_source,
    maintenance_requirements,
    warranty,
    keyFeatures,
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(250).required(),
    recommendedUse: Joi.string().required(),
    power_source: Joi.string().valid("Electronic", "IC", "Manual").required(),
    maintenance_requirements: Joi.string(),
    keyFeatures: Joi.string(),
    warranty: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "INVALID_INPUT",
          "Invalid input provided.",
          error.details
        )
      );
  } else {
    try {
      const payload = getPayloadFromToken(req);
      const category = await equipmentCategory.create({
        name,
        description,
        recommendedUse,
        power_source,
        maintenance_requirements,
        warranty,
        keyFeatures,
        createdBy: payload.id,
      });

      return res
        .status(201)
        .json(
          createSuccessResponse("equipment category created successfully", "")
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_CRETE_CATEGORY",
            "cant able to create the table",
            {}
          )
        );
    }
  }
};

export const updateEquipmentCategory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    recommendedUse,
    power_source,
    maintenance_requirements,
    warranty,
    keyFeatures,
    id,
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(250),
    recommendedUse: Joi.string(),
    power_source: Joi.string().valid("Electronic", "IC", "Manual"),
    maintenance_requirements: Joi.string(),
    keyFeatures: Joi.string(),
    warranty: Joi.string(),
    id: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "INVALID_INPUT",
          "Invalid input provided.",
          error.details
        )
      );
  } else {
    const category = await equipmentCategory.findOne({
      where: { id: id, deletedAt: null },
    });
    if (!category) {
      return res
        .status(404)
        .json(createErrorResponse("RECORD_NOT_EXIT", "Record is not exit."));
    }

    try {
      const payload = getPayloadFromToken(req);
      await equipmentCategory.update(
        {
          name,
          description,
          recommendedUse,
          power_source,
          maintenance_requirements,
          warranty,
          keyFeatures,
          updatedBy:payload?.id,
        },
        { where: { id: id } }
      );
      return res
        .status(200)
        .json(
          createSuccessResponse("Equipment category update successfully.", "")
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_UPDATE_CATEGORY",
            "Cant able to update the table.",
            {}
          )
        );
    }
  }
};

export const deleteEquipmentCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  const category = await equipmentCategory.findOne({
    where: { id: categoryId, deletedAt: null },
  });

  if (!category) {
    return res
      .status(404)
      .json(createErrorResponse("RECORD_NOT_EXIT", "Record is not exit."));
  } else {
    try {
      const payload = getPayloadFromToken(req);
      await equipmentCategory.update(
        { deletedAt: new Date() },
        { where: { id: categoryId, deletedAt: null,updatedBy:payload?.id } }
      );
      return res
        .status(200)
        .json(
          createSuccessResponse("Equipment category deleted successfully", "")
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_DELETE_CATEGORY",
            "cant able to delete the table",
            {}
          )
        );
    }
  }
};

export const createChemicalCategory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    recommendedUse,
    type,
    activeIngredient,
    applicationMethod,
    safetyPrecautions,
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(250).required(),
    recommendedUse: Joi.string().required(),
    type: Joi.string()
      .valid("FERTILIZER", "HERBICIDE", "INSECTICIDE", "FUNGICIDE", "OTHER")
      .required(),
    activeIngredient: Joi.string().valid("YES", "NO").required(),
    applicationMethod: Joi.string(),
    safetyPrecautions: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "INVALID_INPUT",
          "Invalid input provided.",
          error.details
        )
      );
  } else {
    try {
      const payload = getPayloadFromToken(req);
      const category = await chemicalCategory.create({
        name,
        description,
        recommendedUse,
        type,
        activeIngredient,
        applicationMethod,
        safetyPrecautions,
        createdBy: payload.id,
      });

      return res
        .status(201)
        .json(
          createSuccessResponse("equipment category created successfully", "")
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_CRETE_CATEGORY",
            "cant able to create the table",
            {}
          )
        );
    }
  }
};

export const updateChemicalCategory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    recommendedUse,
    type,
    activeIngredient,
    applicationMethod,
    safetyPrecautions,
    id,
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(250),
    recommendedUse: Joi.string(),
    type: Joi.string().valid(
      "FERTILIZER",
      "HERBICIDE",
      "INSECTICIDE",
      "FUNGICIDE",
      "OTHER"
    ),
    activeIngredient: Joi.string().valid("YES", "NO"),
    applicationMethod: Joi.string(),
    safetyPrecautions: Joi.string(),
    id: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "INVALID_INPUT",
          "Invalid input provided.",
          error.details
        )
      );
  } else {
    const category = await chemicalCategory.findOne({
      where: { id: id, deletedAt: null },
    });
    if (!category) {
      return res
        .status(404)
        .json(createErrorResponse("RECORD_NOT_EXIT", "Record is not exit."));
    }

    try {
      const payload = getPayloadFromToken(req);
      await chemicalCategory.update(
        {
          name,
          description,
          recommendedUse,
          type,
          activeIngredient,
          applicationMethod,
          safetyPrecautions,
          updatedBy:payload?.id
        },
        { where: { id: id } }
      );
      return res
        .status(200)
        .json(
          createSuccessResponse("Chemical category update successfully.", "")
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_UPDATE_CATEGORY",
            "Cant able to update the table.",
            {}
          )
        );
    }
  }
};

export const deleteChemicalCatCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  const category = await chemicalCategory.findOne({
    where: { id: categoryId, deletedAt: null },
  });

  if (!category) {
    return res
      .status(404)
      .json(createErrorResponse("RECORD_NOT_EXIT", "Record is not exit."));
  } else {
    try {
      const payload = getPayloadFromToken(req);
      await chemicalCategory.update(
        { deletedAt: new Date() },
        { where: { id: categoryId, deletedAt: null, updatedBy:payload?.id } }
      );
      return res
        .status(200)
        .json(
          createSuccessResponse("Chemical category deleted successfully", "")
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          createErrorResponse(
            "UNABLE_TO_DELETE_CATEGORY",
            "cant able to delete the table",
            {}
          )
        );
    }
  }
};