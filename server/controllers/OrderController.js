const Order = require('../models/Order')
const Payment = require('../models/Payment')
const mongoose = require('mongoose');


module.exports = {
    fetchOrders: async(req, res) => {
        try {
            // const data = await const Payment = require('./Payment');
            // const Order = require('./Order');
            // const Product = require('./Product');
            
            // Payment.aggregate([
            //   {
            //     $lookup: {
            //       from: 'users',
            //       localField: 'user',
            //       foreignField: '_id',
            //       as: 'user'
            //     }
            //   },
            //   {
            //     $lookup: {
            //       from: 'orders',
            //       localField: 'items',
            //       foreignField: '_id',
            //       as: 'orders'
            //     }
            //   },
            //   {
            //     $unwind: '$user'
            //   },
            //   {
            //     $unwind: '$orders'
            //   },
            //   {
            //     $lookup: {
            //       from: 'products',
            //       localField: 'orders.product',
            //       foreignField: '_id',
            //       as: 'orders.product'
            //     }
            //   },
            //   {
            //     $unwind: '$orders.product'
            //   },
            //   {
            //     $project: {
            //       _id: 1,
            //       user: {
            //         name: '$user.name'
            //       },
            //       reference: 1,
            //       deliveryAddress: '$deliveryAddress',
            //       phone: '$phone',
            //       amount: 1,
            //       status: 1,
            //       orders: {
            //         _id: '$orders._id',
            //         payment: '$orders.payment',
            //         quantity: '$orders.quantity',
            //         total: '$orders.total',
            //         product: {
            //           id: '$orders.product._id',
            //           title: '$orders.product.title',
            //           image: '$orders.product.image',
            //           quantity: '$orders.product.quantity',
            //           total: '$orders.product.total'
            //         }
            //       }
            //     }
            //   }
            // ]);
            
            res.json(data)
        } catch(err) {
            res.status(400).send('Unable to fetch orders, please try refreshing the request')
        }
    },

    makeOrder: async(req, res) => {
        try {
            const { user, ref, address, phone, amount, items } = req.body;
            const referenceExists = await Payment.findOne({reference: ref});
            if(referenceExists) res.status(400).send('Possible duplicate transaction!');

            await Payment.create({
                user, 
                reference: ref, 
                deliveryAaddress: address,
                phone,
                amount
            })
            await Order.create(items)

            res.json('Successfully made order!!')

        } catch(err) {
            console.log("err",err)
            res.status(500).send('Unable to make order');
        }
    },
    updateOrderStatus: async(req, res) => {
        try {
            await Payment.updateMany(
                { _id: { $in: req.body.ids } },
                { status: req.body.status }
            )
            res.send('Successfully updated '+req.body.ids.length+ ' order statuses')
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Unable to update order status');
        }
    }
}