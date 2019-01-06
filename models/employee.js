const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require('../config');

const Employee = mongoose.model(config.models.employee,
    new Schema({
        firstName: {
            type: String,
            // text: true
        },
        lastName: {
            type: String,
            // text: true,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        department: String,
        basicSalary: {
            type: Number,
            required: true
        },
        designation: String,
        bonusPlan: {
            type: Schema.Types.ObjectId,
            ref: config.models.bonusPlan,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    })
);

module.exports = Employee;
