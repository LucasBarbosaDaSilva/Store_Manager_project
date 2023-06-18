const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { error, salesValidationMock } = require('./mock/middlewares.mock');
const { validateSales } = require('../../../src/middlewares/validateSales');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando validação de sales, requisito 6', function () {
  it('Teste se chama a proxima função', async function () {
    const req = { body: salesValidationMock };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await validateSales(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testa se retorna a mensagem "productId" is required', async function () {
    const req = { body: error };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await validateSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});