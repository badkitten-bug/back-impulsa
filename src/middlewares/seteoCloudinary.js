const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFileUsers = async(file) => {
    try{
      const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
        folder: "imagesUsers"
      });
      return res;
    }
    catch(error){
      console.log("error uploadFile: " + error); 
    }  
};

module.exports = {uploadFileUsers};