const connection = require('../db');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return products;
};

const getByIdProduct = async (id) => {
  const [product] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?;',
    [id],
  );

  return product;
};

const newProduct = async (name, quantity) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  const productCreate = {
    id: product.insertId,
    name,
    quantity,
  };

  return productCreate;
};

const searchProductByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT name FROM StoreManager.products WHERE name = ?',
    [name],
  );

  return product;
};

const editProduct = async (id, name, quantity) => {
    await connection.execute(
      'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
      [name, quantity, id],
    );

  const product = {
    id,
    name,
    quantity,
  };

  return product;
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

const productsModel = {
  getAllProducts,
  getByIdProduct,
  newProduct,
  searchProductByName,
  editProduct,
  deleteProduct,
};

module.exports = productsModel;