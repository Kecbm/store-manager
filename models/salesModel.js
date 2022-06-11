const connection = require('../db');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
    A.sale_id AS 'saleId', B.date, A.product_id as 'productId', A.quantity
    FROM
    StoreManager.sales_products AS A
        INNER JOIN
    StoreManager.sales AS B
    ON A.sale_id = B.id;`,
  );

  return sales;
};

const getByIdSale = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
    B.date, A.product_id as 'productId', A.quantity
    FROM
    StoreManager.sales_products AS A
        INNER JOIN
    StoreManager.sales AS B
    ON A.sale_id = B.id
    WHERE id = ?;`,
    [id],
  );

  return sale;
};

const insertSalesProducts = async (saleId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
    VALUES(?, ?, ?)`, [saleId, productId, quantity],
  );

  return {
    productId,
    quantity,
  };
};

const newSale = async (sales) => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES(NOW());',
  );

  const newSales = await Promise
  .all(sales.map((elem) => insertSalesProducts(sale.insertId, elem.productId, elem.quantity)));

  const saleCreate = ({
      id: sale.insertId,
      itemsSold: newSales,
    });
  return saleCreate;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
};

const editSalesProducts = async (id, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );

  return {
    productId,
    quantity,
  };
};

const editSale = async (id, sale) => {
  const salesEdited = await Promise
  .all(sale.map((elem) => editSalesProducts(id, elem.productId, elem.quantity)));

  const sales = ({
    saleId: id,
    itemUpdated: salesEdited,
  });

  return sales;
};

const salesModel = {
  getAllSales,
  getByIdSale,
  newSale,
  deleteSale,
  editSale,
};

module.exports = salesModel;