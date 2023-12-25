import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localfilePath, folderName) => {
    try {
        const cloudData = await cloudinary.uploader.upload(localfilePath, {
            folder: folderName
        })

        console.log(cloudData);

        fs.unlinkSync(localfilePath)

        return cloudData
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localfilePath)

    }
}

export default uploadOnCloudinary 