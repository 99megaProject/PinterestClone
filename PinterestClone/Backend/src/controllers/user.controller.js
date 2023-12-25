import { errorApi, ErrorApi } from "../utils/error.utils.js";
import { responseApi } from "../utils/response.utils.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.utils.js";
import { AVATAR_NAME } from "../../constant.js";
import bcrypt from "bcrypt";
import { response } from "express";

const userRegister = async (req, res) => {
  const { firstname, lastname, email, password, gender } = req.body;
  console.log(req.body);

  // checking all filed are not empty
  if (
    [firstname, lastname, email, password, gender].some(
      (filed) => filed == undefined || filed.trim() == ""
    )
  )
    return errorApi("All Credential required.", 404, res);
  console.log(req.body);

  //checking if user already registered

  const userData = await User.findOne({ email });
  if (userData != null)
    return errorApi("User already registered with this email id.", 404, res);

  console.log(userData);
  // checking avatar url
  const avatarLocalPath =
    req.files && req.files.avatar && req.files.avatar[0]
      ? req.files.avatar[0].path
      : "";
  if (avatarLocalPath == "") return errorApi("Avatar also required", 404, res);

  // upload image on cloudinary

  let cloudinaryData = await uploadOnCloudinary(avatarLocalPath, AVATAR_NAME);
  // console.log(cloudinaryData);

  console.log(cloudinaryData);
  // generate username
  let username = firstname[0] + lastname[0];
  for (let i = 1; i <= 6; i++) {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    username += str[parseInt(Math.random() * str.length)];
  }

  console.log(username);

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    gender,
    avatar: cloudinaryData.url,
  });

  // console.log(user);
  return responseApi("User registered successfully.", 201, user, res);
};

// user login

const userLogin = async (req, res) => {
  // console.log(req.body);
  try {
    const username = req.body?.username || "";
    const email = req.body?.email || "";
    const password = req.body?.password || "";

    //  console.log( " user name " , username,  "email " , email, password);
    if (!username && !email)
      // return errorApi("All credential required", 400, res);
      throw new ErrorApi("All credential required by Error", 400, res);

    const user = await User.findOne({ $or: [{ username }, { email }] });

    console.log(user);
    if (!user)
      return errorApi("Invalid credential", 400, res);

    // throw new ErrorApi("All credential user required by Error", 400, res);

    if (!password) return errorApi("Password required", 400, res);

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) return errorApi("Password doesn't match", 400, res);

    // generate access & refresh token

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    user.refreshToken = refreshToken;

    const options = {
      httpOnly: false,
      secure: true,
    };

    // return res
    //   .status(200)
    //   .cookie("refreshToken", refreshToken, options)
    //   .cookie("accessToken", accessToken, options)
    //   .json({ success: true, data: user });

    res
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options);
    return responseApi("User loged in successfully", 200, user, res);
  } catch (error) {
    console.log(error);
    errorApi(error.message || "User Login failed", 400, res);
  }
};

// user logout

const userLogout = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: "" },
      },
      { new: true }
    );

    console.log(userData);

    const options = {
      httpOnly: true,
      secure: true,
    };

    // return res
    //   .status(200)
    //   .clearCookie("refreshToken", options)
    //   .clearCookie("accessToken", options)
    //   .json({ success: true, msg: "User log out successfully" });
    res
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options);

    return responseApi("User logout successfully", 200, {}, res);
  } catch (error) {
    return errorApi("Log out failed", 400, res);
  }
};

const userDetails = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return errorApi("User details failed", 404, res);
    return responseApi("User details.", 200, user, res);
  } catch (error) {
    return errorApi("User details failed", 404, res);
  }
};

const userRemove = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return errorApi("Invalid request", 404, res);

    // delete account
    await user.deleteOne();

    // remove cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options);

    return responseApi("User deleted successfully", 200, {}, res);
  } catch (error) {
    return errorApi("User Delete failed", 404, res);
  }
};

const userChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // validate values
    if (
      [oldPassword, newPassword, confirmPassword].some(
        (field) => field.trim() == ""
      )
    )
      return errorApi("All credintal required", 402, res);

    if (newPassword != confirmPassword)
      return errorApi("New password doesn't match confirm password", 400, res);

    if (newPassword.length < 8)
      return errorApi("Password length is too short ", 400, res);

    const user = await User.findById(req.user._id);

    if (!Object.keys(user).length)
      return errorApi("Password changed failed", 400, res);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect)
      return errorApi("Old password doesn't match", 400, res);

    // change password now
    user.password = newPassword;
    await user.save();

    req.user = user;

    return responseApi("Password changed successfully", 201, user, res);
  } catch (error) {
    return errorApi("Password changed failed", 400, res);
  }
};

const userUpdateProfile = async (req, res) => {
  try {
    const firstname = req?.body?.firstname || "";
    const lastname = req?.body?.lastname || "";
    const gender = req?.body?.gender || "";

    if ([firstname, lastname, gender].some((field) => field.trim() == ""))
      return errorApi("Enter atleast one credential", 404, res);

    const user = await User.findById(req.user._id);

    // console.log(user);

    if (!user) return errorApi("User not found.", 404, res);
    // console.log(req.user);

    let flage = false;
    if (firstname) {
      user.firstname = firstname;
      flage = true;
    }
    if (lastname) {
      user.lastname = lastname;
      flage = true;
    }
    if (
      gender &&
      (gender == "male" || gender == "female" || gender == "other")
    ) {
      user.gender = gender;
      flage = true;
    }

    // console.log(user);

    if (flage) await user.save({ validateBeforeSave: false });

    return responseApi("Profile updated successfully", 201, user, res);
  } catch (error) {
    return errorApi("User update profile failed.", 404, res);
  }
};

const userUpdateProfilePicture = async (req, res) => {
  try {
    // console.log(req.files);
    const avatar = req?.files?.avatar[0]?.path;

    // console.log("avatar", avatar);

    if (!avatar) return errorApi("Please pick one photo", 404, res);

    const cloudData = await uploadOnCloudinary(avatar, AVATAR_NAME);

    // console.log(cloudData);

    const user = await User.findById(req.user._id);
    // console.log(user);

    if (!user) return errorApi("User not found", 404, res);

    user.avatar = cloudData.url;
    await user.save({ validateBeforeSave: false });
    return responseApi("Profile picture updated successfully", 201, {}, res);
  } catch (error) {
    return errorApi("Profile update failed", 404, res);
  }
};

// const userForgetPassword = async (req, res) => {

//   try {
//     const { email } = req.body;
//     if (!email) return errorApi("Email is required", 404, res);

//     const user = await User.findOne({ email });

//     if (!user) return errorApi("User not found", 404, res);

//     // generate 6 digit otp
//     let otp = "";
//     for (let i = 1; i <= 6; i++) {
//       let str = "0123456789";
//       otp += str[parseInt(Math.random() * str.length)];
//     }

//     console.log(otp);
//   } catch (error) {
//     return errorApi("Forget password failed", 404, res);
//   }
// };

const userCreatedPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("createdPost");

    console.log(user);
    if (!user) return errorApi("Unauthorised request", 404, res);

    return responseApi(
      "Fetch created post successfully",
      200,
      user.createdPost,
      res
    );

    // const createdPosts  = await user.createdPost().popu
  } catch (error) {
    return errorApi("Posts not found", 404, res);
  }
};

const userSavedPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedPost");

    if (!user) return errorApi("Unauthorised request", 400, res);

    return responseApi(
      "Fetched saved post sunccessfully",
      200,
      user.savedPost,
      res
    );
  } catch (error) {
    return errorApi("Saved post not found", 404, res);
  }
};

const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("following");

    if (!user) return errorApi("Unauthorised request", 400, res);

    return responseApi(
      "Fetched following successfully",
      200,
      user.following,
      res
    );
  } catch (error) {
    return errorApi("Following not found", 404, res);
  }
};

const userSavingPost = async (req, res) => {
  try {
    const { _id } = req.body;

    console.log(_id);
    if (!_id) return errorApi("Unauthorised request", 404, res);

    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { savedPost: _id },
    });
    if (!user) return errorApi("Unauthorised request", 404, res);
    return responseApi("Saving post successfully", 201, user.savedPost, res);
  } catch (error) {
    return errorApi("Saving post failed", 404, res);
  }
};

export {
  userRegister,
  userLogin,
  userLogout,
  userDetails,
  userRemove,
  userChangePassword,
  userUpdateProfile,
  userUpdateProfilePicture,
  userCreatedPost,
  userSavedPost,
  userFollowing,
  userSavingPost,
};

// essential function

async function generateAccessAndRefreshToken(userId) {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    return errorApi(
      "Something went wrong while generating access or refresh token",
      400,
      res
    );
  }
}
