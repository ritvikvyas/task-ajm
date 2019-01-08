const config = require('../config');
const util = require('../util');

// Load Employee Model
const Employee = require('../models/employee');

module.exports = {
    create: create,
    list: list,
    // getById: getById,
    // update: update,
    // remove: remove
};

function list(req, res) {
    const numberOfRecords = parseInt(req.query.size) || config.pageSize;
    const page = parseInt(req.query.p) || 0;
    // as we are recieving pageIndex instead of PageNum
    // const offset = (page - 1) * numberOfRecords;
    let search = req.query.q;
    
    let conditions = { 'isDeleted': false };
    // let sortOptions = {};
    if(search) {
        // conditions = {
        // 'isDeleted': false,
        // "$text": {
        //     "$search": search
        //     }
        // };
        // sortOptions = { "score": { "$meta": "textScore" } };
        search = new RegExp('.*' + search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '.*', 'ig');
        conditions = {
            '$and': [
                { 'isDeleted': false, },
                { '$or': [
                        { 'firstName': { '$regex': search } },
                        { 'lastName': { '$regex': search } }
                    ]
                }
            ]
        };
    }
    Employee.find(conditions)
        // .sort(sortOptions)
        .skip(page * numberOfRecords)
        .limit(numberOfRecords)
        .populate('bonusPlan')
        .exec(function (err, result) {
            if (err) {
                util.errorResponse(res, err, 'listEmployee');
            } else {
                Employee.countDocuments(conditions, function (err, count) {
                    if (err) {
                        util.errorResponse(res, err, 'listEmployeeCount');
                    } else {
                        res.json({
                            data: {
                                result: result,
                                total: count,
                                pageSize: numberOfRecords,
                            },
                            message: 'Employees Fetched Successfully',
                            status: true
                        });
                    }
                });
            }
        });
}

function create(req, res) {
    const newEmployee = new Employee(req.body);
    newEmployee.save(function (err, result) {
        if (err) {
           util.errorResponse(res, err, 'createEmployee');
        } else {
            res.json({
                data: { result: result },
                message: 'Employee Added successfully',
                status: true
            });
        }
    });
}