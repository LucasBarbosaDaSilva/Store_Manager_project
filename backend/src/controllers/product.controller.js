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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { message, type } = await productService.updateProduct(id, name);

  const response = typeof message === 'string' ? { message } : message;

  return res.status(type || 200).json(response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await productService.deleteProduct(id);

  if (type === null) {
    return res.status(204).end();
  }

  return res.status(type).json({ message });
};

module.exports = {
  getAllProducts,
  findById,
  postProduct,
  updateProduct,
  deleteProduct,
};