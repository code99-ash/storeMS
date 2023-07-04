const mongoose = require('mongoose')

const OrdSchema = new mongoose.Schema({
    Order: {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
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