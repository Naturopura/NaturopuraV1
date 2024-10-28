"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userLogin_1 = require("../controllers/userLogin");
const router = (0, express_1.Router)();
// router.post("/signup", signup);
router.post("/signin", userLogin_1.userLogin);
exports.default = router;
