const { productModel } = require('../models');

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

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
