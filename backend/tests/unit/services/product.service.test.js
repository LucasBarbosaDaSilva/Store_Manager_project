const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const { products, newProduct } = require('./mock/product.service.mock');
const { productService } = require('../../../src/services');

describe('Testa a camada service de Produtos', function () {
  it('Testa se é possível listar todos os produtos', async function () {
    sinon.stub(productModel, 'getAll').resolves(products);
    const result = await productService.getAll();
    expect(result).to.be.deep.equal({ type: null, message: products });
  });

  it('Testa se é possível buscar um produto pelo id', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);
    const result = await productService.findById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(products[0]);
  });

  it('Testa se é possível criar um novo produto', async function () {
    sinon.stub(productModel, 'postProduct').resolves(newProduct);
    const result = await productService.postProduct(newProduct.name);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});