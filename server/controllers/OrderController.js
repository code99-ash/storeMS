const Order = require('../models/Order')
const Payment = require('../models/Payment')

const Producer = require('../Producer')
const producer = new Producer()

module.exports = {
    fetchOrders: async(req, res) => {
        try {
            
            const data =await Payment.aggregate([
                {
                  $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'customer',
                    pipeline: [
                        { $project: { name: 1, email: 1 } }
                    ]
                  }
                },
                {
                  $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'products',
                    pipeline: [
                        { $project: { title: 1, image: 1,price: 1,quantity:1 } }
                    ]
                  }
                },
            ])

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
        
            const p = await Payment.create({
                user, 
                reference: ref, 
                deliveryAaddress: address,
                phone,
                amount,
                items
            })
            // await Order.create(items.map(item => {
            //     return {...item, payment: p._id}
            // }))

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
            console.log(req.body.users)
            const message = {
                orderIds: req.body.ids,
                status: req.body.status,
                users: req.body.users
            }
            // console.log(message)
            // // broadcast to user
            producer.sendMessage('Order', {method: 'statusUpdate', message})

            res.send('Successfully updated '+req.body.ids.length+ ' order statuses')
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Unable to update order status');
        }
    },

    getOrderHistory: async(req, res) => {
        try {
            
            const data =await Payment.find({ user: req.params.id })
            res.json(data)
        } catch(err) {
            res.status(400).send('Unable to fetch orders, please try refreshing the request')
        }
    }
} 