const router = require('express').Router()
const adminController = require('../controller/adminController')
const categoryController = require('../controller/categoryController')
const bankController = require('../controller/bankController')
const itemController = require('../controller/itemController')
const featureController = require('../controller/featureController')
const activityController = require('../controller/activityController');
const auth = require('../middlewares/auth')
const { uploadSingle, uploadMultiple } = require('../middlewares/multer')

router.get('/signin', adminController.viewSignin);
router.post('/signin', adminController.actionSignin);
router.use(auth)
router.get('/dashboard', adminController.viewDashboard)
router.get('/logout', adminController.actionLogout);

router.get('/category', categoryController.viewCategory)
router.post('/category', categoryController.addCategory)
router.put('/category', categoryController.editCategory)
router.delete('/category/:id', categoryController.deleteCategory)


router.get('/bank', bankController.viewBank)
router.post('/bank',uploadSingle, bankController.addBank)
router.put('/bank', uploadSingle, bankController.editBank)
router.delete('/bank/:id', bankController.delBank);


router.get('/item', itemController.viewItems)
router.post('/item', uploadMultiple, itemController.addItem)
router.get('/item/show-images/:id', itemController.showImageItem);
router.get('/item/:id', itemController.showEditItem);
router.put('/item/:id', uploadMultiple, itemController.editItem);
router.delete('/item/:id/delete', itemController.delItem);
router.get('/item/show-detail-item/:itemId', itemController.viewDetailItem);


router.post('/item/add/feature',uploadSingle, featureController.addFeature);
router.delete('/item/:itemId/feature/:id', featureController.delFeature)
router.put('/item/update/feature', uploadSingle, featureController.editFeature);


router.post('/item/add/activity',uploadSingle, activityController.addActivity);
router.put('/item/update/activity', uploadSingle, activityController.editActivity);
router.delete('/item/:itemId/activity/:id', activityController.delActivity)

router.get('/booking', adminController.viewBooking)

module.exports = router