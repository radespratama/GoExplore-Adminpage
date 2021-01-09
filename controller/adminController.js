const Users = require('../models/Users')
const Member = require('../models/Member')
const Booking = require('../models/Booking')
const Item = require('../models/Item')
const path = require('path');
const bcrypt = require('bcrypt');

module.exports = {
    viewDashboard : async (req, res)=> {
        try {
            const member = await Member.find();
            const booking = await Booking.find();
            const item = await Item.find();
            res.render('admin/dashboard/view_dashboard', {
                title: "Go Explore | Dashboard",
                user: req.session.user,
                member,
                booking,
                item
            });
        } catch (error) {
            res.redirect('/admin/dashboard');
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
        req.session.destroy((err) => {
            res.redirect('/admin/signin');
        });
    },
};