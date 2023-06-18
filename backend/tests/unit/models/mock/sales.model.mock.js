const salesList = [
  {
    saleId: 1,
    date: '2021-03-17T00:00:00.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2021-03-28T00:00:00.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2021-03-28T00:00:00.000Z',
    productId: 3,
    quantity: 15,
  },
  {
    saleId: 3,
    date: '2021-03-28T00:00:00.000Z',
    productId: 4,
    quantity: 20,
  },
];

const newSale = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  salesList,
  newSale,
};
