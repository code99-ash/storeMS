const router = require('express').Router();
const { makeOrder } = require('../controllers/OrderController')

router.post('/', (...params) => makeOrder(...params));

module.exports = router;