const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

const getByIdSale = async (id) => {
  const sale = await salesModel.getByIdSale(id);

  return sale;
};

const newSale = async (sales) => {
  const sale = await salesModel.newSale(sales);

  return sale;
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

const editSale = async (id, sale) => {
  const sales = await salesModel.editSale(id, sale);

  return sales;
};

const salesService = {
  getAllSales,
  getByIdSale,
  newSale,
  deleteSale,
  editSale,
};

module.exports = salesService;