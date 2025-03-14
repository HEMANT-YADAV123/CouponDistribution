const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true 
    },
    assigned: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Coupon', couponSchema);
