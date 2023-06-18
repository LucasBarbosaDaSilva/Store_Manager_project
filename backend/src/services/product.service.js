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

const postProduct = async (name) => {
  const result = await productModel.postProduct(name);

  return { type: null, message: result };
};

module.exports = {
  getAll,
  findById,
  postProduct,
};
