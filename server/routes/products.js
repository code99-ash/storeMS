const router = require('express').Router();
const { addProduct, editProduct, deleteProduct, updateProductImage } = require('../controllers/ProductController')

router.post('/', (...params) => addProduct(...params))
router.put('/', (...params) => editProduct(...params))
router.delete('/', (...params) => deleteProduct(...params))
router.post('/update-image', (...params) => updateProductImage(...params))


module.exports = router;