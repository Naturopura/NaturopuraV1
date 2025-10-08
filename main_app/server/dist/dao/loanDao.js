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
exports.findLoansAggregate = exports.getTotalApprovedAmount = exports.countLoansByStatus = exports.updateLoanRecordStatus = exports.findLoanById = exports.findLoansByFarmerId = exports.findAllLoans = exports.createLoanRecord = void 0;
const Loan_1 = __importDefault(require("../models/Loan"));
const createLoanRecord = (loanData) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = new Loan_1.default(loanData);
    return yield loan.save();
});
exports.createLoanRecord = createLoanRecord;
const findAllLoans = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Loan_1.default.find()
        .populate('farmer', 'name email')
        .sort({ appliedDate: -1 });
});
exports.findAllLoans = findAllLoans;
const findLoansByFarmerId = (farmerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Loan_1.default.find({ farmer: farmerId }).sort({ appliedDate: -1 });
});
exports.findLoansByFarmerId = findLoansByFarmerId;
const findLoanById = (loanId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Loan_1.default.findById(loanId).populate('farmer', 'name email');
});
exports.findLoanById = findLoanById;
const updateLoanRecordStatus = (loanId, status, rejectionReason) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield Loan_1.default.findById(loanId);
    if (!loan) {
        throw new Error('Loan not found');
    }
    loan.status = status;
    if (status === 'approved') {
        loan.approvedDate = new Date();
    }
    else if (status === 'rejected') {
        loan.rejectedDate = new Date();
        loan.rejectionReason = rejectionReason || 'Application rejected by admin';
    }
    else if (status === 'completed') {
        loan.completedDate = new Date();
    }
    return yield loan.save();
});
exports.updateLoanRecordStatus = updateLoanRecordStatus;
const countLoansByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!status) {
        return yield Loan_1.default.countDocuments();
    }
    return yield Loan_1.default.countDocuments({ status });
});
exports.countLoansByStatus = countLoansByStatus;
const getTotalApprovedAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    const approvedLoans = yield Loan_1.default.find({ status: 'approved' });
    return approvedLoans.reduce((acc, loan) => acc + loan.amount, 0);
});
exports.getTotalApprovedAmount = getTotalApprovedAmount;
const findLoansAggregate = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Loan_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
                pending: {
                    $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                },
                approved: {
                    $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
                },
                rejected: {
                    $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
                }
            }
        }
    ]);
});
exports.findLoansAggregate = findLoansAggregate;
