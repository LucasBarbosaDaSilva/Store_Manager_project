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

module.exports = {
  getAll,
  findById,
  postProduct,
};