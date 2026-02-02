const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    transmissionId: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Watch' },
        name: String,
        img: String,
        price: Number,
        qty: Number,
        brand: String
    }],
    financials: {
        subtotal: Number,
        tax: Number,
        grandTotal: Number
    },
    shippingDetails: {
        name: String,
        email: String,
        mobile: String,
        address: String
    },
    paymentStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Paid (Demo)', 'Paid', 'Failed', 'COD']
    },
    paymentMethod: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
