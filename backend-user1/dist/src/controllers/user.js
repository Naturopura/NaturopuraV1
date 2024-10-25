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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = __importDefault(require("../../helper/ApiResponse"));
const responses_1 = require("../responses");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validUser = yield user_1.default.findOne({ email });
        if (!validUser) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.UserNotExist.message, responses_1.ResponseDefinitions.UserNotExist.code);
        }
        const validPassword = bcryptjs_1.default.compareSync(password, validUser.password);
        if (!validPassword) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.InvalidPassword.message, responses_1.ResponseDefinitions.InvalidPassword.code);
        }
        const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.TOKEN_SECRET, {
            expiresIn: "48h",
        });
        const _a = validUser._doc, { password: pass } = _a, rest = __rest(_a, ["password"]);
        res
            .status(200)
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .json(rest);
    }
    catch (error) {
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code);
    }
});
exports.signin = signin;
// export const signup = async (req: Request, res: Response): Promise<any> => {
//   const { name, email, phone, walletAddress } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
//         expiresIn: "48h",
//       });
//       const { password, ...rest } = user._doc;
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         walletAddress,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
//         expiresIn: "48h",
//       });
//       const { password, ...rest } = newUser._doc;
//       res
//         .status(201)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     }
//   } catch (error) {
//     return ApiResponse.error(
//       ResponseDefinitions.NotFound.message,
//       ResponseDefinitions.NotFound.code
//     );
//   }
// };
