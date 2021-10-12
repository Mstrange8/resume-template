const path = require('path');

const express = require('express');

const router = express.Router();

const publicController = require('../controllers/public');

router.post('/', publicController.getCareerPage);

router.get('/', publicController.getCareerPage);

module.exports = router;