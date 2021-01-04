const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Item = require('../models/Item')
const Image = require('../models/Image')

const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewDashboard :  (req, res)=> {
        res.render('admin/dashboard/view_dashboard', {
            title: "Go Explore | Dashboard",
        })
    },

      /**
     * Category
     */
    viewCategory : async(req, res) => {
        try {
        const category = await Category.find();
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alertType = req.flash('alertType')
        const alert = {type: alertType, message: alertMessage, status: alertStatus}
            res.render('admin/category/view_category', { 
            category,
            alert,
            title: "Go Explore | Category",
        })
        } catch (error) {
            res.redirect('/admin/category');
        }
    },
    addCategory : async (req, res) => {
        try {
            const {name} = req.body;
            await Category.create({ name });
            req.flash('alertMessage', 'Success Add Category');
            req.flash('alertStatus', 'success');
            req.flash('alertType', 'Congratulations!')
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/category');

        }
        
    },
    editCategory: async(req, res) => {
        try {
            const {id, name} = req.body;
            const category = await Category.findOne({_id: id});
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'Success Update Category');
            req.flash('alertStatus', 'warning');
            req.flash('alertType', 'Congratulations!')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/category')
            
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const {id} = req.params;
            const category = await Category.findOne({ _id: id });
            await category.remove();
            req.flash('alertMessage', 'Success Delete Category');
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Congratulations!')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/category');
        }
    },

    /**
     * BANK
     */

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
                bank
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

    /**
     * Items
     */

    viewItems: async (req, res) => {
        try {
            const item = await Item.find()
                .populate({path : 'imageId', select: 'id imageUrl'})
                .populate({path: 'categoryId', select: 'id name'})
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus}; 
            res.render('admin/item/view_item.ejs', {
                title: "Go Explore | Items",
                category,
                alert,
                item,
                action: 'view',
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/item');
        }
        
    },
    addItem : async (req, res)=> {
        try {
            const { categoryId, title, price, city, aboutForm } = req.body;
            if (req.files.length > 0){
                const category = await Category.findOne({_id: categoryId});
                const newItem = {
                    categoryId : category._id,
                    title,
                    description: aboutForm,
                    price,
                    city
                }
                const item = await Item.create(newItem);
                category.itemId.push({_id : item._id});
                await category.save();
                for (let i = 0; i < req.files.length; i++ ){
                    const imageSave = await Image.create({ imageUrl: `images/${req.files[i].filename}`});
                    item.imageId.push({_id: imageSave._id});
                    await item.save();
                }
                req.flash('alertMessage', 'Success Add Item');
                req.flash('alertStatus', 'success');
                req.flash('alertType', 'Congratulations!')
                res.redirect('/admin/item');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/item');
        }
    },
    showImageItem : async (req, res)=> {
        try {
            const {id} = req.params;
            const item = await Item.findOne({ _id: id })
                .populate({path : 'imageId', select: 'id imageUrl'});

            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus}; 
            res.render('admin/item/view_item.ejs', {
                title: "Go Explore | Show Image Item",
                alert,
                item,
                action : 'show_image',
            });

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    viewBooking : (req, res) => {
        res.render('admin/booking/view_booking')
    }

};