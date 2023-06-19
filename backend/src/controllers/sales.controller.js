const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await salesService.getSaleById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const newSale = async (req, res) => {
  const arraySales = req.body;
  const { type, message } = await salesService.createSale(arraySales);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);

  if (type === null) {
    return res.status(204).end();
  }

  return res.status(type).json({ message });
};

module.exports = {
  getAllSales,
  getSaleById,
  newSale,
  deleteSale,
};