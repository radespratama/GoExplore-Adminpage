const Member = require('../models/Member')
const Booking = require('../models/Booking')

module.exports = {
    viewBooking : async(req, res) => {
        try {
            const booking = await Booking.find()
            .populate('memberId')
            .populate('bankId')
            
            res.render('admin/booking/view_booking', {
                title: "Go Explore | Booking",
                user: req.session.user,
                booking
            });   
        } catch (error) {
            res.redirect('/admin/booking');
        }
    },
    showDetailBooking : async (req, res)=> {
        const { id } = req.params
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alertType = req.flash('alertType')
        const alert = {type: alertType, message: alertMessage, status: alertStatus}

        const booking = await Booking.findOne({ _id: id })
        .populate('memberId')
        .populate('bankId');

        res.render('admin/booking/show_detail_booking', {
        title: "Go Explore | Detail Booking",
        user: req.session.user,
        booking,
        alert
        });
    } catch (error) {
        res.redirect('/admin/booking');
    }
    },
    actionConfirmation: async (req, res) => {
        const { id } = req.params;
        try {
            const booking = await Booking.findOne({ _id: id });
            booking.payments.status = 'Accept';
            await booking.save();
            req.flash('alertMessage', 'Success Confirmation Payments');
            req.flash('alertStatus', 'success');
            req.flash('alertType', 'Congratulations!')
            res.redirect(`/admin/booking/${id}`);
        } catch (error) {
            res.redirect(`/admin/booking/${id}`);
        }
    },
    actionReject: async (req, res) => {
        const { id } = req.params;
        try {
            const booking = await Booking.findOne({ _id: id });
            booking.payments.status = 'Reject';
            await booking.save();
            req.flash('alertMessage', 'Success Reject Payments');
            req.flash('alertStatus', 'danger');
            req.flash('alertType', 'Congratulations!')
            res.redirect(`/admin/booking/${id}`);
        } catch (error) {
            res.redirect(`/admin/booking/${id}`);
        }
    }
}