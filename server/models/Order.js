const mongoose = require('mongoose')

const OrdSchema = new mongoose.Schema({
    payment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
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

const Order = mongoose.model('Order', OrdSchema)

module.exports = Order