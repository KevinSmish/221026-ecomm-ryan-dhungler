import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {
  setErrorMessage,
  unauthorizedError,
} from "../helpers/responseHelper.js";

export const requireSignin = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return unauthorizedError(res);

    // Get token from header
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) return unauthorizedError(res);

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded) return unauthorizedError(res);

    req.user = decoded;
    next();
  } catch (err) {
    return unauthorizedError(res);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    if (!user_id) return unauthorizedError(res);

    const user = await User.findById(user_id);
    if (user.role !== 1) return setErrorMessage(res, "Access denied");
    next();
  } catch (err) {
    console.log(err);
    return unauthorizedError(res);
  }
};
