const { productModel } = require('../models');

const INTERNAL_SERVER_ERROR = 'Internal server error';

const getAll = async () => {
  const result = await productModel.getAll();

  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await productModel.findById(id);

  if (!result) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: result };
};

const createProduct = async (name) => {
  const result = await productModel.postProduct(name);

  return { type: null, message: result };
};

const updateProduct = async (id, name) => {
  const result = await productModel.findById(id);
  if (!result) {
    return { type: 404, message: 'Product not found' };
  }
  const update = await productModel.updateProduct(id, name);

  return { type: null, message: update };
};

const deleteProduct = async (id) => {
  const product = await productModel.findById(id);
  if (!product) {
    return { type: 404, message: 'Product not found' };
  }
  const result = await productModel.deleteProduct(id);

  return { type: null, message: result };
};

const getByQuery = async ({ q }) => {
  try {
    const query = { q };
    if (!query.q) query.q = '';
    const products = await productModel.getByQuery(query);
    return { type: null, message: products };
  } catch (error) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  getByQuery,
};
