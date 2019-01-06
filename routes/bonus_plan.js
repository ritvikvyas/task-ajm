const express = require('express');
const router = express.Router();

// Load Employee Controller
const bonusPlanController = require('../controllers/bonus_plan');

// @route   POST /
// @desc    Create new bonusPlan
router.post('/', bonusPlanController.create);

// @route   GET /
// @desc    Read all bonusPlan
router.get('/', bonusPlanController.list);

module.exports = router;