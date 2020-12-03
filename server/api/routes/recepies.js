const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const RecepiesController = require("../controllers/recepies");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.get("/", checkAuth, RecepiesController.recepies_get_all_recepies);

router.post(
  "/",
  checkAuth,
  upload.single("file"),
  RecepiesController.recepies_create_recepie
);

router.get(
  "/:recepieId",
  checkAuth,
  RecepiesController.recepies_get_single_recepie
);

router.patch(
  "/:recepieId",
  checkAuth,
  upload.single("file"),
  RecepiesController.recepies_change_recepie
);

router.delete("/:recepieId", RecepiesController.recepies_delete_recepie);

module.exports = router;
