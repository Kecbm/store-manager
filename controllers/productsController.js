const productsService = require('../services/productsSevice');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsService.getByIdProduct(Number(id));
    
    if (product.length === 0) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(...product);
   } catch (err) {
    next(err);
   }
};

const newProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const productName = await productsService.searchProductByName(name);

    if (productName.length === 1) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    const product = await productsService.newProduct(name, quantity);

    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const editProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  try {
    const productId = await productsService.getByIdProduct(id);

    if (productId.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = await productsService.editProduct(id, name, quantity);

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productId = await productsService.getByIdProduct(id);

    if (productId.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productsService.deleteProduct(id);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const productsController = {
  getAllProducts,
  getByIdProduct,
  newProduct,
  editProduct,
  deleteProduct,
};

module.exports = productsController;