const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const postProduct = async (name) => {
  await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return product;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  return findById(id);
};

const deleteProduct = async (id) => {
  const [product] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );

  return product.affectedRows;
};

const getByQuery = async ({ q }) => {
  const [result] = await connection
    .execute('SELECT * FROM products WHERE name LIKE ?;', [`%${q}%`]);
  return result;
};

module.exports = {
  getAll,
  findById,
  postProduct,
  updateProduct,
  deleteProduct,
  getByQuery,
};