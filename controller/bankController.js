const Bank = require('../models/Bank')
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewBank : async(req, res) => {
        try {
            const bank = await Bank.find();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alertType = req.flash('alertType')
            const alert = {type: alertType, message: alertMessage, status: alertStatus}
            res.render('admin/bank/view_bank', {
                title: "Go Explore | Bank",
                alert,
                bank,
                user: req.session.user
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/bank');
        }
    },
    addBank : async(req, res) => {
        try {
            const {name, nameBank, nomorRekening} = req.body;
            // console.log(req.file);
            await Bank.create({ name, nameBank, nomorRekening, imageUrl : `images/${req.file.filename}` });
            req.flash('alertMessage', 'Success Add Bank');
            req.flash('alertStatus', 'success');
            req.flash('alertType', 'Congratulations!')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/bank');
        }
    },
    editBank : async (req, res)=> {
        try {
            const { id, name, nameBank, nomorRekening} = req.body;
            const bank = await Bank.findOne({_id: id});
            if(req.file == undefined){
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                await bank.save();
                req.flash('alertMessage', 'Success Add Bank');
                req.flash('alertStatus', 'success');
                req.flash('alertType', 'Congratulations!')
                res.redirect('/admin/bank');
            } else {
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                bank.imageUrl = `images/${req.file.filename}`;
                await bank.save();
                req.flash('alertMessage', `${error.message}`);
                req.flash('alertStatus', 'danger');
                req.flash('alertType', 'Oh Noo!')
                res.redirect('/admin/bank');
            }
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/bank');
        }
    },
    delBank: async(req, res) => {
        try {
            const {id} = req.params;
            const bank = await Bank.findOne({ _id: id });
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            await bank.remove();
            req.flash('alertMessage', 'Success Delete Bank');
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Congratulations!')
            res.redirect('/admin/bank');

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/bank');
        }
    },
}