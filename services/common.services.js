const fs = require("fs");

//*Supporting Functions Here *//
const uploadFile = (prefix, File) => {
  return new Promise((resolve, reject) => {
    const { originalname, path } = File;
    const ext = originalname.split(".")[originalname.split(".").length - 1];
    const fileName = `${prefix}${new Date().getTime().toString()}.${ext}`;
    fs.rename(path, `./uploads/${fileName}`, (err) => {
      if (err) reject(err);
      resolve(fileName);
    });
  });
};

module.exports = { uploadFile };
