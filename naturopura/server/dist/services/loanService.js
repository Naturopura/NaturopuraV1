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
exports.getLoanStats = exports.updateLoanStatus = exports.getLoanById = exports.getLoansByFarmerId = exports.getAllLoans = exports.createLoan = void 0;
const loanDao = __importStar(require("../dao/loanDao"));
const statusCode_1 = require("../utils/statusCode");
const createLoan = (loanData) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield loanDao.createLoanRecord(Object.assign(Object.assign({}, loanData), { status: statusCode_1.LoanStatus.PENDING, appliedDate: new Date() }));
    return loan;
});
exports.createLoan = createLoan;
const getAllLoans = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield loanDao.findAllLoans();
});
exports.getAllLoans = getAllLoans;
const getLoansByFarmerId = (farmerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield loanDao.findLoansByFarmerId(farmerId);
});
exports.getLoansByFarmerId = getLoansByFarmerId;
const getLoanById = (loanId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield loanDao.findLoanById(loanId);
});
exports.getLoanById = getLoanById;
const updateLoanStatus = (loanId, status, rejectionReason) => __awaiter(void 0, void 0, void 0, function* () {
    return yield loanDao.updateLoanRecordStatus(loanId, status, rejectionReason);
});
exports.updateLoanStatus = updateLoanStatus;
const getLoanStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalLoans = yield loanDao.countLoansByStatus('');
    const pendingLoans = yield loanDao.countLoansByStatus(statusCode_1.LoanStatus.PENDING);
    const approvedLoans = yield loanDao.countLoansByStatus(statusCode_1.LoanStatus.APPROVED);
    const rejectedLoans = yield loanDao.countLoansByStatus(statusCode_1.LoanStatus.REJECTED);
    const completedLoans = yield loanDao.countLoansByStatus(statusCode_1.LoanStatus.COMPLETED);
    const totalApprovedAmount = yield loanDao.getTotalApprovedAmount();
    return {
        totalLoans,
        pendingLoans,
        approvedLoans,
        rejectedLoans,
        completedLoans,
        totalApprovedAmount,
    };
});
exports.getLoanStats = getLoanStats;
