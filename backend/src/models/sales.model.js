const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sl.date, sl.id AS saleId, pr.product_id AS producId, prquantity 
    FROM sales_products AS pr 
    INNER JOIN sales AS sl ON sl.id = sale_id 
    ORDER BY sl.id, product_id ASC;`,
     );

  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sl.date pr.product_id AS producId, pr.quantity 
    FROM sales_products AS pr 
    INNER JOIN sales AS sl ON sl.id = sale_id AND sale_id = ?
    ORDER BY sl.id, product_id ASC;`,
    [id],
  );

  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};