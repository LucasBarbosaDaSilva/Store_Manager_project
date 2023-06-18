const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesList } = require('./mock/sales.model.mock');

describe('Testa a camada model de Sales', function () {
  it('Recupera todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesList]);

    const sales = await salesModel.getAllSales();
    expect(sales).to.be.deep.equal(salesList);
  });

  it('Recupera uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([salesList[0]]);
    const sale = await salesModel.getSaleById(1);
    expect(sale).to.be.deep.equal(salesList[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
