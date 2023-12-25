import express from "express";
import {
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
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import sendmail from "../utils/mail.utils.js";

const router = express.Router();

import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userRegister
);

router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);

router.route("/me").get(verifyJWT, userDetails);
router.route("/delete").delete(verifyJWT, userRemove);
router.route("/change-password").put(verifyJWT, userChangePassword);
router.route("/update-profile").put(verifyJWT, userUpdateProfile);
router.route("/update-profile-picture").post(
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userUpdateProfilePicture
);

router.route("/mycreated-posts").get(verifyJWT, userCreatedPost);
router.route("/mysaved-posts").get(verifyJWT, userSavedPost);
router.route("/following").get(verifyJWT, userFollowing);

router.route("/saving-post").post(verifyJWT, userSavingPost);

export default router;
