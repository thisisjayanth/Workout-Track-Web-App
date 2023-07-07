const ensureAuth = (req,res, next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}
const ensureGuest = (req,res,next)=>{
    if(!req.isAuthenticated()) return next();
        res.redirect('/');
}
module.exports = {
    ensureAuth,
    ensureGuest
}