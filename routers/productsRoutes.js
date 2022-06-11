const express = require('express');

const router = express.Router();

const productsControllers = require('../controllers/productsController');

const { validateName, validateQuantity } = require('../middlewares/validateRoutes');

router.get('/', productsControllers.getAllProducts);
router.post('/', validateName, validateQuantity, productsControllers.newProduct);
router.get('/:id', productsControllers.getByIdProduct);
router.put('/:id', validateName, validateQuantity, productsControllers.editProduct);
router.delete('/:id', productsControllers.deleteProduct);

module.exports = router;