const router = require('express').Router();
const { makeOrder, updateOrderStatus, fetchOrders, getOrderHistory } = require('../controllers/OrderController')

router.get('/', (...params) => fetchOrders(...params));
router.post('/', (...params) => makeOrder(...params));
router.put('/', (...params) => updateOrderStatus(...params));
router.get('/history/:id', (...params) => getOrderHistory(...params));

module.exports = router;