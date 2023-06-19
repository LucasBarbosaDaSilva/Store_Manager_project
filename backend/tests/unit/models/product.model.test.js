const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, newProduct, upDate, editUpdate } = require('./mock/product.model.mock');

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

  it('Testa atualizar um produto na camada model', async function () {
    sinon.stub(connection, 'execute').resolves([[upDate]]);
    const result = await productModel.updateProduct(editUpdate);
    expect(result).to.be.deep.equal(upDate);
  });

  it('Testa deletar um produto na camada model', async function () {
    const deletedProduct = [{ affectedRows: 1 }];
    sinon.stub(connection, 'execute').resolves(deletedProduct);
    const result = await productModel.deleteProduct(1);

    expect(result).to.be.deep.equal(deletedProduct[0].affectedRows);
  });

 it('Testa buscar um produto pelo nome na camada model', async function () {
    const name = 'Mjolnir';

    sinon.stub(connection, 'execute').resolves([products[0]]);

    const result = await productModel.getByQuery({ q: name });

    expect(result).to.be.deep.equal(products[0]);
    expect(result).to.have.property('id');
  });

  afterEach(function () {
    sinon.restore();
  });
});
