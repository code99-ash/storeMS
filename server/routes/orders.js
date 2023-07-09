const router = require('express').Router();
const { makeOrder, updateOrderStatus, fetchOrders, getOrderHistory } = require('../controllers/OrderController')
const { verifyAdminAccess, verifyUserAccess } = require('../middleware/verifyAcess')


router.post('/', verifyUserAccess, (...params) => makeOrder(...params));
router.get('/history/:id', verifyUserAccess, (...params) => getOrderHistory(...params));
router.get('/', verifyAdminAccess, (...params) => fetchOrders(...params));
router.put('/', verifyAdminAccess, (...params) => updateOrderStatus(...params));

module.exports = router;