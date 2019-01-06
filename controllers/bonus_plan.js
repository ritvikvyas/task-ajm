const util = require('../util');

// Load BonusPlan Model
const BonusPlan = require('../models/bonus_plan');

module.exports = {
    create: create,
    list: list,
    // getById: getById,
    // update: update,
    // remove: remove
};

function list(req, res) {
    BonusPlan.find({ 'isDeleted': false })
        .exec(function (err, result) {
            if (err) {
                util.errorResponse(res, err, 'listBonusPlan');
            } else {
                res.json({
                    data: { result: result },
                    message: 'BonusPlans Fetched Successfully',
                    status: true
                });
            }
        });
}

function create(req, res) {
    const newBonusPlan = new BonusPlan(req.body);
    newBonusPlan.save(function (err, result) {
        if (err) {
           util.errorResponse(res, err, 'createBonusPlan');
        } else {
            res.json({
                data: { result: result },
                message: 'BonusPlan Added successfully',
                status: true
            });
        }
    });
}