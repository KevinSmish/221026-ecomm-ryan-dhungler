import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import ApiError from "../exceptions/apiError.js";
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";

export const users = async (req, res, next) => {
  res.json({ data: "Hello, world?" });
};

export const register = async (req, res, next) => {
  try {
    // 1. all fields required validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
    }

    // 2. destructure name, email, password from req.body
    const { name, email, password } = req.body;

    // 3. check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(ApiError.BadRequest(`Email ${email} is already taken`));
    }

    // 4 hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // 6. create signed jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // 1. all fields required validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
    }

    // 2. destructure email, password from req.body
    const { email, password } = req.body;
    // 3. check if email is not exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.BadRequest(`User ${email} is not found`));
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return next(ApiError.BadRequest("Wrong password!"));
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 6. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
