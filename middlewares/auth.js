const isLogin = (req, res, next)=>{
    if(req.session.user == null || req.session.user == undefined){
        req.flash('alertMessage', 'Session Timed Out!!');
        req.flash('alertStatus', 'danger');
        req.flash('alertType', 'Oh Noo!')
        res.redirect('/admin/signin');
        } else {
            next()
        }
    }

module.exports = isLogin;