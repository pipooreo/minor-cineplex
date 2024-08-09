import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload_1 = async (file) => {
  // console.log(file);
  // file = file.image;
  let result = null;
  const filePath = file.image[0].path;
  // console.log(filePath);

  // Check if the file exists
  try {
    await fs.access(filePath);
  } catch {
    throw new Error("File does not exist");
  }
  try {
    // Upload file to Cloudinary
    // console.log(result);
    result = await cloudinary.uploader.upload(filePath, {
      folder: "minor_cineplex/users",
      private: true,
    });
    // console.log(result);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary"); // Throwing error to let the caller handle it
  }

  // Clean up the local file
  try {
    await fs.unlink(filePath);
  } catch (unlinkError) {
    console.error("Error deleting local file:", unlinkError);
    // You might want to handle this error differently, depending on your needs
  }

  // Return file URL and public ID
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

const sanitizePublicId = (filename) => {
  return filename.toLowerCase().replace(/[^a-z0-9]/g, "_"); // Replace non-alphanumeric characters with underscores
};

const cloudinaryUpload = async (fileBuffer, filename) => {
  const sanitizedFilename = sanitizePublicId(filename);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "minor_cineplex/users", public_id: sanitizedFilename },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(new Error("Failed to upload file to Cloudinary"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );

    stream.on("error", (err) => {
      console.error("Stream error:", err);
      reject(new Error("Stream error during file upload"));
    });

    stream.end(fileBuffer);
  });
};

export default cloudinaryUpload;
