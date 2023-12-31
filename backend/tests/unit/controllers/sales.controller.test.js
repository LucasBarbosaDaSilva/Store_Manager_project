const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesList } = require('./mock/sales.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller de Sales', function () {
  it('Testa o retorno do status 200 e a mensagem de sucesso', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales').resolves({ message: salesList, type: null });

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesList);
  });

  it('Testa o retorno do status 200 e o id', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSaleById').resolves({ message: salesList[0], type: null });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesList[0]);
  });

  it('Testa se deleta uma venda', async function () {
    const req = {};
    const res = {};

    req.params = { id: 1 };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSale').resolves({ type: null });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Testa se cria uma venda', async function () {
    const req = {
      body: {
        productId: 1,
        quantity: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'createSale').resolves({ message: salesList[0], type: null });

    await salesController.newSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesList[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});