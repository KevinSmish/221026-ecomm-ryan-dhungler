import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ApiError from "../exceptions/apiError.js";

export const requireSignin = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    // Get token from header
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = decoded;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    if (!user_id) {
      return next(ApiError.UnauthorizedError());
    }

    const user = await User.findById(user_id);
    if (user.role !== 1) {
      return next(ApiError.BadRequest("Access denied"));
    }

    next();
  } catch (err) {
    console.log(err);
    return next(ApiError.UnauthorizedError());
  }
};
