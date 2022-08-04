const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.session.admin == true){
        return next();
    }
    res.redirect('/admin/signin');
}

module.exports = helpers;