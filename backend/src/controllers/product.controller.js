const { productService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.getAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await productService.findById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productService.createProduct(name);

  return res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  findById,
  postProduct,
};