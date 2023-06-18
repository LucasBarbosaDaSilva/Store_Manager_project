const salesMockCreateError1 = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesMockCreateError2 = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesMockCreateError3 = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesMockCreateCorrect = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  salesMockCreateError1,
  salesMockCreateError2,
  salesMockCreateError3,
  salesMockCreateCorrect,
};