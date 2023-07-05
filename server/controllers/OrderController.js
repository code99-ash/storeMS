const Order = require('../models/Order')
const Payment = require('../models/Payment')
const mongoose = require('mongoose');


module.exports = {
    makeOrder: async(req, res) => {
        try {
            const { user, ref, address, phone, amount, items } = req.body;
            const referenceExists = await Payment.findOne({reference: ref});
            if(referenceExists) res.status(400).send('Possible duplicate transaction!');

            /*
            const session = await mongoose.startSession()
            session.startTransaction();
            session.withTransaction(async () => {
                await Payment.create({
                    user, 
                    reference: ref, 
                    deliveryAaddress: address,
                    phone,
                    amount
                })
            }).then((result) => {
                console.log('result', result)
                session.commitTransaction()
            }).catch((err) => {
                console.log('Transaction Aborted!!', err)
            }).finally(() => {
                session.endSession()
            })
            */
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