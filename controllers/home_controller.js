module.exports.home = function(req, res){
    return res.end('<h1>Express is up!</h1>')
};

module.exports.project = function(req, res){
    return res.end('<h1>Project page is running!</h1>');
};

module.exports.about = function(req, res) {
    return res.end('<h1>About us is coming!</h1>');
};