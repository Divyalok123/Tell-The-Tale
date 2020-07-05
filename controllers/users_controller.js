module.exports.profile = function(req,res) {
    // res.end('<h1>Users profile are running!</h1>');
    return res.render('user', {
        user: "Divyalok"
    });
};

module.exports.favourites = function(req, res) {
    res.end('<h1>favourites page is running fine!</h1>');
};