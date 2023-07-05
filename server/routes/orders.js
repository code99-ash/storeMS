const router = require('express').Router();
const { makeOrder, updateOrderStatus } = require('../controllers/OrderController')

router.post('/', (...params) => makeOrder(...params));
router.put('/', (...params) => updateOrderStatus(...params));

module.exports = router;