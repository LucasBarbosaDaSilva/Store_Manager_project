const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sl.sale_id AS saleId,
      pr.date,
      sl.product_id AS productId,
      sl.quantity
    FROM
      sales_products AS sl
        INNER JOIN
      sales AS pr ON pr.id = sl.sale_id
    ORDER BY sl.sale_id , sl.product_id`,
    );
  
    return result;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT 
    pr.date, sl.product_id AS productId, sl.quantity
    FROM
      sales_products AS sl
          INNER JOIN
      sales AS pr ON pr.id = sl.sale_id
    WHERE
    sl.sale_id = ?
    ORDER BY sl.sale_id , sl.product_id`,
    [id],
    );
  
    return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};