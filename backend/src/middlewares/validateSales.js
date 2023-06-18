const { validateId, validateQuantity } = require('./schemas/sales.schema');

const validateSales = (req, res, next) => {
  const arraySales = req.body;
  
  const status = validateId(arraySales).status || validateQuantity(arraySales).status;

  const message = validateId(arraySales).message || validateQuantity(arraySales).message;

  if (message) return res.status(status).json({ message });
  
  next();
};

module.exports = {
  validateSales,
};