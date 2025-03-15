const multer = require("multer");

//configuración multer
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMulter = upload.single("foto"); 

const {uploadFileUsers} = require("./seteoCloudinary");
const errorUploadFile = require("./errorUploadFile");

const uploadImageUser = async (req,res,next) => {
    try {
      await errorUploadFile(req, res, uploadMulter);
      if(req.file !== undefined){
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const dataFile = await uploadFileUsers(dataURI);
        return dataFile;
      } else{
          return req.file;
      };
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message
      });
    };
};

module.exports = uploadImageUser;