import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  registerUserService,
  loginUserService,
  getAllUsersService,
} from "../models/userModel.js";

dotenv.config();

const createToken = (userId) => {
  const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
  const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || "2h";
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
};

const handlResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const registerUser = async (req, res, next) => {
  const user_avatar =
    req.body.user_avatar || "https://example.com/default-avatar.png";
  const { user_name, user_email, user_password } = req.body;

  const hashPassword = await bcrypt.hash(user_password, 8);

  try {
    const newUser = await registerUserService(
      user_name,
      user_email,
      hashPassword,
      user_avatar
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.user_id,
        name: newUser.user_name,
        avatar: newUser.user_avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await loginUserService(user_email);
    if (!user) {
      return handlResponse(res, 404, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!isPasswordValid) {
      return handlResponse(res, 401, "Mật khẩu không đúng");
    }

    const token = createToken(user.user_id);
    return res.json({
      message: "Login successfully",
      token: token,
      user: {
        id: user.user_id,
        name: user.user_name,
        fullname: user.user_full_name,
        avatar: user.user_avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handlResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};
