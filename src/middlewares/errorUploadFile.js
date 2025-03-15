const errorUploadFile = async(req,res,fn) => {
  try {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
          return resolve(result);
      });
    });
  } catch (error) {
      console.log("errorUploadFile: " + error);
  };
};

module.exports = errorUploadFile;