const multer = require("multer");
const Images = require("../models/imagesModel");
const fs = require("file-system");

const upload_image = async (req, res, upload) => {
  try {
    upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
        // A Multer error occurred when uploading.
      } else if (err) {
        return res.status(500).json(err);
        // An unknown error occurred when uploading.
      }
      // here we can add filename or path to the DB
      console.log(
        `this could go to the DB: ${req.file.filename}, or this: ${req.file.path}`
      );
      await Images.create({
        pathname: req.file.path,
        filename: req.file.filename,
        title: req.body.title
      });
      return res.status(200).json(req.file);
      // Everything went fine.
    });
  } catch (error) {
    console.log("error =====>", error);
  }
};

const fetch_images = async (req, res) => {
  try {
    const images = await Images.find({});
    res.status(200).json({ images });
  } catch (error) {
    console.log("error =====>", error);
  }
};

const delete_image = async (req, res) => {
  const { _id, filename } = req.params;
  try {
    const deleted = await Images.deleteOne({ _id });
    fs.unlink(`../client/public/images/${filename}`, err => {
      if (err) throw err;
      console.log(`${filename} was deleted`);
      //return res.status(200).json({ message: `${filename} was deleted` });
    });
    res.send({ deleted });
  } catch (error) {
    console.log("error =====>", error);
  }
};

const update_image = async (req, res) => {
  let params = req.body;  
    
    try {
      const updated = await Images.updateOne(
        { _id: params._id }, {featured: params.featured}
      );
      res.send({ updated });
    }
    catch (error) {
      res.send({ error });
    };
}

module.exports = {
  upload_image,
  fetch_images,
  delete_image,
  update_image
};
