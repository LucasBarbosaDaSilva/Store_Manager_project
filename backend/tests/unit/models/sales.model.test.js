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

  it('Testa se deleta uma venda', async function () {
    const saleRemove = [{ affectedRows: 1 }];
    sinon.stub(connection, 'execute').resolves(saleRemove);
    const sale = await salesModel.deleteSale(salesList.id);
    expect(sale).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});