module.exports = {
    errorResponse: errorResponse
};

function errorResponse(res, err, tag) {
    console.log(tag, err);
    res.status(500).json({ status: false, message: 'Something Went Wrong', error: err });
}