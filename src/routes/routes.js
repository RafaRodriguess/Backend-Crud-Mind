const express = require("express");
const router = express.Router();
const path = require("path");
const uploadImage = require("../middlewares/uploadImage");
const userController = require("../controllers/userControllers");
const courseController = require("../controllers/courseControllers");

router.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

router.post("/upload-image", uploadImage.single("image"), courseController.uploadImage);
router.post("/course", courseController.createCourse);
router.get("/course", courseController.getCourses);
router.delete("/course/:id", courseController.deleteCourse);
router.put("/course/:id", courseController.editCourse);

//user
router.get("/user", userController.getAllUsers);

router.post("/user", userController.createUser);

router.delete("/user:id", userController.deleteUser);

router.post("/login", userController.login);

module.exports = router;
