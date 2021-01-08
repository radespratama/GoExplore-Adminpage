const Users = require('../models/Users')
const path = require('path');
const bcrypt = require('bcrypt');

module.exports = {
    viewDashboard :  (req, res)=> {
        try {
            res.render('admin/dashboard/view_dashboard', {
                title: "Go Explore | Dashboard",
                user: req.session.user
            })
        } catch (error) {
            
        }
    },
    viewSignin : async(req, res)=> {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alertType = req.flash('alertType')
            const alert = {type: alertType, message: alertMessage, status: alertStatus}
            if(req.session.user == null || req.session.user == undefined){
            res.render('index', {
                alert,
                title: 'Go Explore | Login'
            })
            } else {
                res.redirect('/admin/dashboard')
            }
           
        } catch (error) {
            res.redirect('/admin/signin');
        }
    },
    actionSignin : async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({ username: username });
            if (!user) {
            req.flash('alertMessage', 'User not found!!');
            req.flash('alertType', 'Oh Noo!')
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/signin');
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                req.flash('alertMessage', 'Password Incorrect!!');
                req.flash('alertType', 'Oh Noo!')
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin');
            }

            req.session.user = {
                id: user.id,
                username: user.username
            }

            res.redirect('/admin/dashboard');

        } catch (error) {
            res.redirect('/admin/signin');
        }
    },
    actionLogout : async(req, res)=>{
        req.session.destroy();
        res.redirect('/admin/signin');
    },

    

    viewBooking : (req, res) => {
        res.render('admin/booking/view_booking', {
            user: req.session.user
        })
    }

};