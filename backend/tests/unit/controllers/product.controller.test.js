const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { products, newProduct } = require('./mock/product.controller.mock');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { validationNewProduct } = require('../../../src/middlewares/validateProduct');

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
   const req = {
      body: { name: 'Mjolnir' },
    };
    const res = {};
    const next = sinon.stub();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(productService, 'createProduct').resolves({ type: null, message: newProduct });

    await validationNewProduct(req, res, next);
    await productController.postProduct(req, res);

    expect(next).to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Testa se é possível deletar um produto', async function () {
    const req = {};
    const res = {};
    req.params = { id: 1 };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(productService, 'deleteProduct').resolves({ type: null });

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});