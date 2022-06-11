const express = require('express');

const router = express.Router();

const salesControllers = require('../controllers/salesControllers');

const { validateProductId, validateQuantitySale } = require('../middlewares/validateRoutes');

router.get('/', salesControllers.getAllSales);
router.post('/', validateQuantitySale, validateProductId, salesControllers.newSale);
router.get('/:id', salesControllers.getByIdSale);
router.put('/:id', salesControllers.editSale);
router.delete('/:id', salesControllers.deleteSale);

module.exports = router;