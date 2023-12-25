import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(
  verifyJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createPost
);

router.route("/update/:id").put(verifyJWT, updatePost);

router.route("/delete/:id").delete(verifyJWT, deletePost);

router.route("/all-posts").get(verifyJWT, getAllPosts);

export default router;
