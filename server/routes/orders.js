const router = require('express').Router();
const { makeOrder, updateOrderStatus, fetchOrders } = require('../controllers/OrderController')

router.get('/', (...params) => fetchOrders(...params));
router.post('/', (...params) => makeOrder(...params));
router.put('/', (...params) => updateOrderStatus(...params));

module.exports = router;