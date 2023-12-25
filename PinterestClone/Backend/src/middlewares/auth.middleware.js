import { errorApi } from "../utils/error.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

    const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedInfo?._id).select("-password -refreshToken");
    if (!user) return errorApi("Invalid access token", 404, res);

    if (!token) return errorApi("Unauthorised request", 404, res);

    req.user = user;
    next();
  } catch (error) {
    return errorApi("Invalid access token", 400, res);
  }
};
