module.exports = {
    ensureAuth: function(req,res,next) {
        if(req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/users/signin');
        }
    },
    ensureGuest : function(req,res,next){
        if(req.isAuthenticated()) {
            res.redirect('/notes/all-notes')
        } else {
            return next();
        }
    }

}