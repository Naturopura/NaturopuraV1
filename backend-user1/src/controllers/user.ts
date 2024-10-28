import bcryptjs from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";
import { Request, Response } from "express";

export const signin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return ApiResponse.error(
        ResponseDefinitions.UserNotExist.message,
        ResponseDefinitions.UserNotExist.code
      );
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return ApiResponse.error(
        ResponseDefinitions.InvalidPassword.message,
        ResponseDefinitions.InvalidPassword.code
      );
    }

    const token = jwt.sign({ id: validUser._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "48h",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return ApiResponse.error(
      ResponseDefinitions.NotFound.message,
      ResponseDefinitions.NotFound.code
    );
  }
};

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
