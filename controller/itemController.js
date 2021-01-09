const Category = require('../models/Category');
const Item = require('../models/Item')
const Image = require('../models/Image')
const Feature = require('../models/Feature')
const Activity = require('../models/Activity')

const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewItems: async (req, res) => {
        try {
            const item = await Item.find()
                .populate({path : 'imageId', select: 'id imageUrl'})
                .populate({path: 'categoryId', select: 'id name'})
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alertType = req.flash('alertType')
            const alert = {type: alertType, message: alertMessage, status: alertStatus}
            res.render('admin/item/view_item.ejs', {
                title: "Go Explore | Items",
                category,
                alert,
                item,
                action: 'view',
                user: req.session.user
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
            const { categoryId, title, price, city, about } = req.body;
            if (req.files.length > 0){
                const category = await Category.findOne({_id: categoryId});
                const newItem = {
                    categoryId : category._id,
                    title,
                    description: about,
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

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alertType = req.flash('alertType')
            const alert = {type: alertType, message: alertMessage, status: alertStatus} 
            res.render('admin/item/view_item.ejs', {
                title: "Go Explore | Show Image Item",
                alert,
                item,
                action : 'show_image',
                user: req.session.user
            });

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/item');
        }
    },
    showEditItem : async (req, res)=> {
        try {
            const {id} = req.params;
            const item = await Item.findOne({ _id: id })
                .populate({path : 'imageId', select: 'id imageUrl'})
                .populate({path : 'categoryId', select: 'id name'});
            const category = await Category.find();    
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alertType = req.flash('alertType')
            const alert = {type: alertType, message: alertMessage, status: alertStatus}
            res.render('admin/item/view_item.ejs', {
                title: "Go Explore | Show Edit Item",
                alert,
                item,
                category,
                action : 'edit',
                user: req.session.user
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/item');
        }
    },
    editItem : async (req, res)=> {
        try {
            const {id} = req.params;
            const { categoryId, title, price, city, about } = req.body;
            const item = await Item.findOne({ _id: id })
                .populate({path : 'imageId', select: 'id imageUrl'})
                .populate({path : 'categoryId', select: 'id name'});

                if(req.files.length > 0){
                    for(let i = 0; i < item.imageId.length; i++){
                        const imageUpdate = await Image.findOne({_id:item.imageId[i]._id});
                        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
                        imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                        await imageUpdate.save();
                    }
                    item.title = title;
                    item.price = price;
                    item.city = city;
                    item.description = about;
                    item.categoryId = categoryId;
                    await item.save();
                    req.flash('alertMessage', 'Success Update Item');
                    req.flash('alertStatus', 'success');
                    req.flash('alertType', 'Congratulations!')
                    res.redirect('/admin/item');
                } else {
                    item.title = title;
                    item.price = price;
                    item.city = city;
                    item.description = about;
                    item.categoryId = categoryId;
                    await item.save();
                    req.flash('alertMessage', 'Success Update Item');
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
    delItem : async (req, res)=>{
        try {
            const {id} = req.params;
            const item = await Item.findOne({ _id: id }).populate('imageId');
            for(let i = 0; i < item.imageId.length; i++){
                Image.findOne({_id: item.imageId[i]._id}).then((image)=> {
                    fs.unlink(path.join(`public/${image.imageUrl}`));
                    image.remove();
                }).catch((err)=>{
                    req.flash('alertMessage', `${error.message}`);
                    req.flash('alertStatus', 'danger');
                    req.flash('alertType', 'Oh Noo!')
                    res.redirect('/admin/item');
                });
            }
            await item.remove();
                req.flash('alertMessage', 'Success Delete Item');
                req.flash('alertStatus', 'danger');
                req.flash('alertType', 'Congratulations!')
                res.redirect('/admin/item');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect('/admin/item');
        }
    },

    viewDetailItem : async (req, res)=>{
        const { itemId } = req.params;
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alertType = req.flash('alertType')
            const alert = {type: alertType, message: alertMessage, status: alertStatus}
            
            const feature = await Feature.find({itemId: itemId});
            const activity = await Activity.find({itemId: itemId})
            res.render('admin/item/detail_item/view_detail_item',{
                title: 'GoExplore | Details Item',
                alert,
                itemId,
                feature,
                activity,
                user: req.session.user
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
   
}