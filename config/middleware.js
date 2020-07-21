module.exports.setFlash = function(req, res, next) {
    //in the locals we will set the flash message 
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}