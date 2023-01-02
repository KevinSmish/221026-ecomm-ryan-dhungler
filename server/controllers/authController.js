import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Order from "../models/order.js";

import { hashPassword, comparePassword } from "../helpers/authHelper.js";

export const users = async (req, res, next) => {
  res.json({ data: "Hello, world?" });
};

export const register = async (req, res, next) => {
  try {
    // 1. all fields required validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = "Ошибка при валидации";
      const errors = validationErrors.array();
      return res.json({ error, errors });
    }

    // 2. destructure name, email, password from req.body
    const { name, email, password } = req.body;

    // 3. check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = `Email ${email} is already taken`;
      return res.json({ error });
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
      const error = "Ошибка при валидации";
      const errors = validationErrors.array();
      return res.json({ error, errors });
    }

    // 2. destructure email, password from req.body
    const { email, password } = req.body;
    // 3. check if email is not exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = `User ${email} is not found`;
      return res.json({ error });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      const error = "Wrong password!";
      return res.json({ error });
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

export const updateProfile = async (req, res) => {
  try {
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);

    // check password length
    if (password && password.length < 3) {
      return res.json({
        error: "Password is required and should be min 3 characters long",
      });
    }
    // hash the password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};
