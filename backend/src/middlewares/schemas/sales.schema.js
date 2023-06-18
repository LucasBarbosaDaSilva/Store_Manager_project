const validateId = (sales) => {
  const ids = sales.map((sale) => sale.productId);
  if (ids.includes(undefined)) return { status: 400, message: '"productId" is required' };
  return { status: null, message: '' };
};

const validateQuantity = (sales) => {
  const quantity = sales.map((sale) => sale.quantity);
  if (quantity.includes(undefined)) return { status: 400, message: '"quantity" is required' };
  const quantityEvery = quantity.every((value) => value < 1);
  if (quantityEvery) {
    return { status: 422, message: '"quantity" must be greater than or equal to 1' }; 
  }
  return { status: null, message: '' };
};

module.exports = {
  validateId,
  validateQuantity,
};