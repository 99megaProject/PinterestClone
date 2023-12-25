// import express from 'express'
// import { upload } from '../middlewares/multer.middleware.js'
// import uploadOnCloudinary from '../utils/cloudinary.utils.js'

// const router = express.Router()

// router.route('/upload').post(upload.fields([
//     {
//         name: 'avatar',
//         maxCount: 1

//     }
// ]), async (req, res) => {

//     // checking avatar
//     const avatarLocalpath = req.files.avatar[0].path;
//     const data = await uploadOnCloudinary(avatarLocalpath, 'raja')
//     console.log(data);
// })

// export default router

console.log("hellow again");

// const obj = {
// //   name: "raju",
// //   class: "IV",
// };

// console.log(obj);

// if (Object.keys(obj).length) {
//   console.log("object is present");
// } else {
//   console.log("object is not  present");
// }

let labelArr = ["ram", "krish", "man"];
if (!labelArr.some((value) => value == "kit")) labelArr.push("kit");

console.log(labelArr);
