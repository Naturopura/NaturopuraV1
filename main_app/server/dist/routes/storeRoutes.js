"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const storeController_1 = require("../controllers/storeController");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticate, storeController_1.createStore);
router.get('/', authMiddleware_1.authenticate, storeController_1.getStores);
router.get('/:id', authMiddleware_1.authenticate, storeController_1.getStore);
router.put('/:id', authMiddleware_1.authenticate, storeController_1.updateStore);
router.delete('/:id', authMiddleware_1.authenticate, storeController_1.deleteStore);
exports.default = router;
