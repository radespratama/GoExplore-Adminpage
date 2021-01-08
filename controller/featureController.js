const Item = require('../models/Item')
const Feature = require('../models/Feature')

const fs = require('fs-extra');
const path = require('path');

module.exports = {
    addFeature : async (req, res)=> {
        try {
            const { name, qty, itemId } = req.body;
            if(!req.file){
                req.flash('alertMessage', 'Failed! Image not Found');
                req.flash('alertStatus', 'danger');
                req.flash('alertType', 'Oh Noo!')
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            const feature = await Feature.create ({
                name,
                qty,
                itemId,
                imageUrl: `images/${req.file.filename}`
            });

            const item = await Item.findOne({_id:itemId});
            item.featureId.push({_id:feature._id});
            await item.save();
            req.flash('alertMessage', 'Success Add Feature');
            req.flash('alertType', 'Congratulations!')
            req.flash('alertStatus', 'success');

            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    delFeature : async (req, res)=> {
        const {id, itemId} = req.params;
        try {
            const feature = await Feature.findOne({ _id: id });

            const item = await Item.findOne({ _id: itemId}).populate('featureId');
            for (let i = 0; i < item.featureId.length;i++){
                if(item.featureId[i]._id.toString() === feature._id.toString()) {
                    item.featureId.pull({ _id : feature._id });
                    await item.save();
                } 
            }
            await fs.unlink(path.join(`public/${feature.imageUrl}`));
            await feature.remove();
            req.flash('alertMessage', 'Success Delete Feature');
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Congratulations!')
            res.redirect(`/admin/item/show-detail-item/${itemId}`)

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    editFeature : async (req, res)=> {
        const { id, name, qty, itemId} = req.body;
        try {
            const feature = await Feature.findOne({_id: id});
            if(req.file == undefined){
                feature.name = name;
                feature.qty = qty;
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature');
                req.flash('alertStatus', 'warning');
                req.flash('alertType', 'Congratulations!')
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }else {
                await fs.unlink(path.join(`public/${feature.imageUrl}`));
                feature.name = name;
                feature.qty = qty;
                feature.imageUrl = `images/${req.file.filename}`;
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature');
                req.flash('alertStatus', 'warning');
                req.flash('alertType', 'Congratulations!')
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
}