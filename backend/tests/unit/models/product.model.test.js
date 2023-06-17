const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products } = require('./mock/product.model.mock');

describe('Testa o model de produtos', function () {
  it('Lista todos os produtos da camada model', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const response = await productModel.getAll();
    expect(response).to.be.deep.equal(products);
  });

  afterEach(function () {
    sinon.restore();
  });
});
