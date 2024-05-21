const express = require("express");
const multer = require("multer") //
const Photo = require("../db/photoModel");
const router = express.Router();
const uploadCloud = require("../middleware/upload.middleware");
const auth = require("../middleware/auth");

const fs = require("fs");
// const upload = require("../middleware/multerConfig");
const upload = multer();

router.post("/", async (request, response) => {});

router.get("/photosOfUser", async (request, response) => {
  try {
    const photo = await Photo.find({});
    response.send(photo);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/photosOfUser/:id", auth, async (request, response) => {
  try {
    const photo = await Photo.find({ user_id: request.params.id });

    response.send(photo);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post(
  "/uploadimage",
  auth,
  upload.single("myImage"),
  uploadCloud,
  async (req, res, next) => {
    try {
      // const img = fs.readFileSync(req.file.path);
      // const encode_image = img.toString("base64");
      const newPhoto = new Photo({
        // file_name: req.file.filename,
        file_name: req.file.originalname,
        user_id: req.body.user_id,
        comments: [],
        // encode_image: encode_image,
        encode_image: req.body["myImage"]
      });
      
      await newPhoto.save();

      console.log("Photo saved to database:", newPhoto.file_name);

      // fs.unlinkSync(req.file.path);

      res.status(200).json({ message: "Photo uploaded successfully" });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Error uploading photo" });
    }
  },
);

router.delete("/deleteimage/:photoId", auth, async (request, response) => {
  try {
    const deletedPhoto = await Photo.findOneAndDelete({
      _id: request.params.photoId,
    });

    if (!deletedPhoto) {
      return response.status(404).send({ error: "Không tìm thấy ảnh để xóa." });
    }

    response.status(200).send({ message: "Xóa ảnh thành công.", deletedPhoto });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.post("/commentsOfPhoto/:photo_id", auth, async (request, response) => {
  try {
    const photo = await Photo.findOne({ _id: request.params.photo_id });

    console.log(request.body);

    const newComment = {
      comment: request.body.comment,
      date_time: new Date(),
      user_id: request.body.user_id,
    };

    photo.comments.push(newComment);

    await photo.save();

    response.status(200).send({ message: "Comment added successfully" });
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
