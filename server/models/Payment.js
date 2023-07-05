const mongoose = require('mongoose')

const PaymSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order',
        required: true,
    }],
    reference: {
        type: String,
        required: true,
    },
    deliveryAaddress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true,
    },
}, { 
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    } 
})

const Payment = mongoose.model('Payment', PaymSchema)

module.exports = Payment