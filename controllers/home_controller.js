module.exports.home = function(req, res){
    // console.log(req.cookies); //since cookies are coming in request
    // res.cookie('user_id', 20);//changing the value of the cookie
    return res.render('home', {
        title: "Tell the tale",
        person: "Divyalok"
    })
};

module.exports.project = function(req, res){
    return res.end('<h1>Project page is running!</h1>');
};

module.exports.about = function(req, res) {
    return res.end('<h1>About us is coming!</h1>');
};