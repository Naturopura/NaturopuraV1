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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDeliveryPartnerApproval = void 0;
const checkDeliveryPartnerApproval = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'delivery_partner') {
        try {
            const User = require('../models/User').default;
            const user = yield User.findById(req.user._id).select('deliveryPartnerApprovalStatus');
            if (!user || user.deliveryPartnerApprovalStatus !== 'approved') {
                res.status(403).json({
                    success: false,
                    message: 'Access denied: Delivery partner not approved'
                });
                return;
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error checking delivery partner approval'
            });
            return;
        }
    }
    next();
});
exports.checkDeliveryPartnerApproval = checkDeliveryPartnerApproval;
