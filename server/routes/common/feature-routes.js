const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeature
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeature);

module.exports = router;
