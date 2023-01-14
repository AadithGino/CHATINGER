const express = require("express");
const router = express.Router();

const statusController = require("../../controller/User/StatusFeature");

router.route("/status-upload").post(statusController.uploadStatus);

router.route("/get-status").post(statusController.getStatus)

router.route("/get-my-status").get(statusController.getMyStatus)

module.exports = router;
