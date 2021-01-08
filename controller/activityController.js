const Item = require('../models/Item');
const Activity = require('../models/Activity');

const path = require('path')
const fs = require('fs-extra')

module.exports = {
    addActivity : async (req, res)=> {
        try {
            const { name, type, itemId } = req.body;
            if(!req.file){
                req.flash('alertMessage', 'Failed! Image not Found');
                req.flash('alertStatus', 'danger');
                req.flash('alertType', 'Oh Noo!')
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            const activity = await Activity.create ({
                name,
                type,
                itemId,
                imageUrl: `images/${req.file.filename}`
            });

            const item = await Item.findOne({_id:itemId});
            item.activityId.push({_id:activity._id});
            await item.save();
            req.flash('alertMessage', 'Success Add Activity');
            req.flash('alertStatus', 'success');
            req.flash('alertType', 'Congratulations!')
            res.redirect('/admin/item');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Oh Noo!')
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    editActivity : async (req, res)=> {
        const { id, name, type, itemId} = req.body;
        try {
            const activity = await Activity.findOne({_id: id});
            if(req.file == undefined){
                activity.name = name;
                activity.type = type;
                await activity.save();
                req.flash('alertMessage', 'Success Update Activity');
                req.flash('alertStatus', 'warning');
                req.flash('alertType', 'Congratulations!')
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }else {
                await fs.unlink(path.join(`public/${activity.imageUrl}`));
                activity.name = name;
                activity.type = type;
                activity.imageUrl = `images/${req.file.filename}`;
                await activity.save();
                req.flash('alertMessage', 'Success Update Activity');
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
    delActivity : async (req, res)=> {
        const {id, itemId} = req.params;
        try {
            const activity = await Activity.findOne({ _id: id });

            const item = await Item.findOne({ _id: itemId}).populate('activityId');
            for (let i = 0; i < item.activityId.length;i++){
                if(item.activityId[i]._id.toString() === activity._id.toString()) {
                    item.activityId.pull({ _id : activity._id });
                    await item.save();
                } 
            }
            await fs.unlink(path.join(`public/${activity.imageUrl}`));
            await activity.remove();
            req.flash('alertMessage', 'Success Delete Activity');
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
}