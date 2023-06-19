const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesList } = require('./mock/sales.service.mock');

describe('Testa a camada service de Sales', function () {
  it('Testa se é possível listar todas as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesList);
    const result = await salesService.getAllSales();
    expect(result).to.be.deep.equal({ type: null, message: salesList });
  });

  it('Testa se é possível listar uma venda pelo id', async function () {
    const id = 1;
    sinon.stub(salesModel, 'getSaleById').resolves(salesList[0]);
    const result = await salesService.getSaleById(id);
    expect(result).to.be.deep.equal({ type: null, message: salesList[0] });
  });

  it('Testa se é possível criar uma venda', async function () {
    const arraySales = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    sinon.stub(salesModel, 'createSale').resolves(1);
    const result = await salesService.createSale(arraySales);
    expect(result).to.be.deep.equal({
      type: null,
      message: { id: 1, itemsSold: arraySales },
    });
  });

  it('Testa se deleta uma venda', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([[salesList]]);
    sinon.stub(salesModel, 'deleteSale').resolves(1);

    const result = await salesService.deleteSale(1);

    expect(result.message).to.be.deep.equal([salesList]);
  });

  afterEach(function () {
    sinon.restore();
  });
});