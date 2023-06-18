const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { products, newProduct } = require('./mock/product.controller.mock');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa a camada controller', function () {
  it('Testa se retorna status 200', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'getAll').resolves({ message: products });

    await productController.getAllProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products);
  });

  it('Testa se retorna status 200 e com id', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'findById').resolves({ type: null, message: products[0] });

    await productController.findById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(products[0]);
  });

  it('Testa se é possível cadastrar um novo produto', async function () {
   const res = {};
    const req = {
      body: { name: 'Mjolnir' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'postProduct').resolves({ message: newProduct });

    await productController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});