const express = require('express');
const router = express.Router();

// Load Employee Controller
const employeeController = require('../controllers/employee');

// @route   POST /
// @desc    Create new employee
router.post('/', employeeController.create);

// @route   GET /
// @desc    Read all employees
router.get('/', employeeController.list);

/** Current Task specification does
*** not require these functionalities
*** but still adding them for reference
**/

// // @route   GET /:id
// // @desc    Read employee with id
// router.get('/:id', employeeController.getById);

// // @route   PUT /
// // @desc    Update existing employee
// router.put('/', employeeController.update);

// // @route   DELETE /:id
// // @desc    Delete employee with id
// router.delete('/:id', employeeController.remove);

module.exports = router;