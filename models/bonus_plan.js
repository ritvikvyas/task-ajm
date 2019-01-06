const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require('../config');

const BonusPlan = mongoose.model(config.models.bonusPlan,
    new Schema({
        name: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true
        }
    })
);

module.exports = BonusPlan;
