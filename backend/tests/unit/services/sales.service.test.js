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

  afterEach(function () {
    sinon.restore();
  });
});