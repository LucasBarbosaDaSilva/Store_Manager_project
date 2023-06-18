const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (sale.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

const createSale = async (arraySales) => {
  try {
    const newSaleId = await salesModel.createSale(arraySales);
    return { type: null, message: { id: newSaleId, itemsSold: arraySales } };
  } catch (error) {
    return { type: 404, message: 'Product not found' };
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};