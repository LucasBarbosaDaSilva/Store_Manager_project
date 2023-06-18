const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { 
  salesMockCreateCorrect, 
  salesMockCreateError1,
  salesMockCreateError2,
  salesMockCreateError3,
} = require('./mock/middlewares.mock');
const { validateSales } = require('../../../src/middlewares/validateSales');

const { expect } = chai;
chai.use(sinonChai);

describe('Test sales Validator', function () {
  it('01 - If it call next function', async function () {
    const req = { body: salesMockCreateCorrect };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await validateSales(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('02 - If it return message productId', async function () {
    const req = { body: salesMockCreateError1 };
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