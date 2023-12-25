import { responseApi } from "../utils/response.utils.js";
import { errorApi } from "../utils/error.utils.js";
import uploadOnCloudinary from "../utils/cloudinary.utils.js";
import { POST_FOLDER_NAME } from "../../constant.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const createPost = async (req, res) => {
  // console.log(req.body);
  try {
    const { title, description, label } = req.body;
    if ([title, description, label].some((field) => field.trim() == ""))
      return errorApi("All credential required", 404, res);

    // console.log({ title, description, label });

    const userId = req.user._id;
    // console.log(userId);
    if (!userId) return errorApi("User not found", 404, res);
    const image = req?.files?.image[0]?.path;
    // console.log(image);

    if (!image) return errorApi("Post Image not found", 404, res);

    const cloudData = await uploadOnCloudinary(image, POST_FOLDER_NAME);

    if (!cloudData) return errorApi("Post uploading failed", 404, res);

    const post = await Post.create({
      title,
      description,
      label,
      image: cloudData.url,
      owner: userId,
    });

    // console.log(post);

    if (!post) return errorApi("Post uploading failed", 404, res);

    const user = await User.findByIdAndUpdate(userId, {
      $push: { createdPost: post._id },
    });

    // console.log(user);
    if (!user) return errorApi("User not found", 404, res);

    return responseApi("Created post successfully", 201, post, res);
  } catch (error) {
    return errorApi("Post creation failed", 404, res);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params);

    if (!id) return errorApi("Post not found", 404, res);

    const title = req?.body?.title || "";
    const description = req?.body?.description || "";
    const label = req?.body?.label || "";

    if (!title && !description && !label)
      return errorApi("All fields required", 404, res);

    const post = await Post.findById(id);

    // console.log(post);
    if (!post) return errorApi("Post not found", 404, res);

    let flage = false;
    if (title) {
      post.title = title;
      flage = true;
    }
    if (description) {
      post.description = description;
      flage = true;
    }
    if (label) {
      let labelArr = post.label;
      if (!labelArr.some((value) => value == label)) labelArr.push(label);
      post.label = labelArr;
      labelArr = "";
      flage = true;
    }

    if (flage) await post.save({ validateBeforeSave: false });
    return responseApi("Post updated successfully", 202, post, res);
  } catch (error) {
    return errorApi("Post update failed", 404, res);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return errorApi("Post not found", 404, res);

    const post = await Post.findById(id);

    if (!post) return errorApi("Post not found", 404, res);

    await post.deleteOne();

    return responseApi("Post deleted successfully", 200, {}, res);
  } catch (error) {
    return errorApi("Post deletion failed", 404, res);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!Object.keys(posts).length) return errorApi("Post not found", 404, res);
    return responseApi("Post fetched successfully", 200, posts, res);
  } catch (error) {
    return errorApi("Post not found", 404, res);
  }
};

export { createPost, updatePost, deletePost, getAllPosts };
