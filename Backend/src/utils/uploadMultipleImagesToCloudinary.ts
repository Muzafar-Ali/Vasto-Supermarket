import cloudinary from "../config/cloudinary.js";
import ErrorHandler from "./errorClass.js";

const uploadMultipleImagesToCloudinary = async (images: Express.Multer.File[], subFolder: string, title: string) => {
  try {
    
    const slug = title?.toLowerCase()
    .trim()
    .replace(/&/g, 'and')      // Replace "&" with "and"
    .replace(/,/g, '')         // Remove commas
    .replace(/[^\w\s-]/g, '')  // Remove other special characters
    .replace(/\s+/g, '-');     // Replace spaces with hyphens

    // Create an array to hold the URLs of the uploaded images
    const imageUrls: string[] = [];

    // Loop through each image in the array
    for (const image of images) {
      // Convert buffer to data URI
      const base64Image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;

      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(dataURI, {
        resource_type: "image",
        public_id: `image${Math.round(Math.random() * 1E9)}`,
        folder: `vasto-supermarket/${subFolder}/${slug}`,
      });

      // Push the uploaded image URL to the imageUrls array
      imageUrls.push(imageUpload.secure_url);
    }

    // Return the array of image URLs
    return imageUrls;

  } catch (error) {
    console.error('uploadMultipleImagesToCloudinary error: ', error);
    throw new ErrorHandler("Failed to upload images to Cloudinary", 500);
  }
};

export default uploadMultipleImagesToCloudinary;
