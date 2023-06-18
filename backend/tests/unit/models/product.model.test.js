const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mock/product.model.mock');

describe('Testa o model de produtos', function () {
  it('Lista todos os produtos da camada model', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const response = await productModel.getAll();
    expect(response).to.be.deep.equal(products);
  });

  it('Busca um produto pelo id na camada model', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const response = await productModel.findById(id);
    expect(response).to.be.deep.equal(products[0]);
  });

  it('Testa criar novo produto na camada model', async function () {
    sinon.stub(connection, 'execute').resolves([[newProduct]]);

    const result = await productModel.postProduct({ name: 'Mjolnir' });

    expect(result).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});
