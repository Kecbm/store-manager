const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

  return products;
};

const getByIdProduct = async (id) => {
  const product = await productsModel.getByIdProduct(id);

  return product;
};

const newProduct = async (name, quantity) => {
  const product = await productsModel.newProduct(name, quantity);

  return product;
};

const searchProductByName = async (name) => {
  const product = await productsModel.searchProductByName(name);

  return product;
};

const editProduct = async (id, name, quantity) => {
  const product = await productsModel.editProduct(id, name, quantity);

  return product;
};

const deleteProduct = async (id) => {
  const product = await productsModel.deleteProduct(id);

  return product;
};

const productsService = {
  getAllProducts,
  getByIdProduct,
  newProduct,
  searchProductByName,
  editProduct,
  deleteProduct,
};

module.exports = productsService;