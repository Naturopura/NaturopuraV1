"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmerOrders_1 = require("../controllers/farmerOrders");
const router = express_1.default.Router();
router.post("/neworder", farmerOrders_1.newOrder);
exports.default = router;
