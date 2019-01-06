const express = require('express');
const router = express.Router();
const config = require('./config');

const bonusPlan = require("./routes/bonus_plan");
const employee = require("./routes/employee");

router.use('/' + config.models.bonusPlan, bonusPlan);
router.use('/' + config.models.employee, employee);

module.exports = router;
