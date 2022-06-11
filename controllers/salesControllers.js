const salesService = require('../services/salesService');

const getAllSales = async (req, res, next) => {
  try {
    const sales = await salesService.getAllSales();

    res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const getByIdSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sale = await salesService.getByIdSale(Number(id));

    if (sale.length === 0) {
      res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

const newSale = async (req, res, next) => {
  try {
    const sale = await salesService.newSale(req.body);

    return res.status(201).json(sale);
  } catch (err) {
    next(err);
  }
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  try {
    const saleId = await salesService.getByIdSale(id);

    if (saleId.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await salesService.deleteSale(id);
    
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const editSale = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await salesService.editSale(id, req.body);

    res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

const salesController = {
  getAllSales,
  getByIdSale,
  newSale,
  deleteSale,
  editSale,
};

module.exports = salesController;