"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.fetchDashboardStats = void 0;
const loanDao = __importStar(require("../dao/loanDao"));
const userDao = __importStar(require("../dao/userDao"));
const productDao = __importStar(require("../dao/productDao"));
const fetchDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const totalFarmers = yield userDao.findAllFarmers();
    const [totalLoans, loanStats] = yield Promise.all([
        loanDao.countLoansByStatus(''),
        loanDao.findLoansAggregate()
    ]);
    const totalProducts = yield productDao.findAllProducts();
    return {
        totalFarmers: totalFarmers.length,
        totalLoans,
        totalLoanAmount: ((_a = loanStats[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0,
        totalProducts: totalProducts.length,
        pendingLoans: ((_b = loanStats[0]) === null || _b === void 0 ? void 0 : _b.pending) || 0,
        approvedLoans: ((_c = loanStats[0]) === null || _c === void 0 ? void 0 : _c.approved) || 0,
        rejectedLoans: ((_d = loanStats[0]) === null || _d === void 0 ? void 0 : _d.rejected) || 0
    };
});
exports.fetchDashboardStats = fetchDashboardStats;
