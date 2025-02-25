import cloudinary from "../config/cloudinary.js";
import ErrorHandler from "./errorClass.js";

const uploadSingleImageToCloudinary = async ( image: Express.Multer.File, subFolder: string ) => {
  try {

    // Convert buffer to data URI
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    
    const imageUpload = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      public_id: `image${Math.round(Math.random() * 1E9)}`,
      folder: `vasto-supermarket/${subFolder}`,
    });
    
    return imageUpload.secure_url;
    
  } catch (error) {
    console.error('uploadSingleImageToCloudinary error: ', error);
    throw new ErrorHandler("Failed to upload image to Cloudinary", 500);   
  }
};

export default uploadSingleImageToCloudinary;