const express = require("express");
const router = express.Router();
const releaseNotesController = require('../controllers/release-notes');

router.get("/", releaseNotesController.releaseNotesGet);

module.exports = router;