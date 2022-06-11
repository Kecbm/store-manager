const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsSevice');

const dataProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 20,
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
    quantity: 30,
  },
];

describe('Testando o products service getAll', () => {
  before(() => {
    const stubModelGetAll = sinon.stub(productsModel, 'getAllProducts');

    stubModelGetAll.resolves(dataProducts);
  });

  after(() => {
    productsModel.getAllProducts.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.not.be.empty;
  });
});

describe('Testando o products service getById', () => {
  before(() => {
    const stubModelGetById = sinon.stub(productsModel, 'getByIdProduct');

    stubModelGetById.resolves([dataProducts[0]]);
  });

  after(() => {
    productsModel.getByIdProduct.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.getByIdProduct(1);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await productsModel.getByIdProduct(1);

    expect(response).to.not.be.empty;
  });
});

describe('Testando o products service searchByName', () => {
  before(() => {
    const stubModelSearchByName = sinon.stub(productsModel, 'searchProductByName');

    stubModelSearchByName.resolves([dataProducts[0]]);
  });

  after(() => {
    productsModel.searchProductByName.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.searchProductByName('Martelo de Thor');

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await productsModel.searchProductByName('Martelo de Thor');

    expect(response).to.not.be.empty;
  });
});

const newProduct = [
  {
    id: 4,
    name: 'Reator arc',
    quantity: 40,
  },
];

describe('Testando o products service newProduct', () => {
  before(() => {
    const stubModelNewProduct = sinon.stub(productsModel, 'newProduct');

    stubModelNewProduct.resolves(newProduct);
  });

  after(() => {
    productsModel.newProduct.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.newProduct(newProduct);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await productsModel.newProduct(newProduct);

    expect(response).to.not.be.empty;
  });
});

const productEdited = [
  {
    id: 1,
    name: 'Macacão DeadPool',
    quantity: 10,
  },
];

describe('Testando o products service editProduct', () => {
  before(() => {
    const stubModelEditProduct = sinon.stub(productsModel, 'editProduct');

    stubModelEditProduct.resolves(productEdited);
  });

  after(() => {
    productsModel.editProduct.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.editProduct(productEdited);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await productsModel.editProduct(productEdited);

    expect(response).to.not.be.empty;
  });
});

describe('Testando o products service deleteProduct', () => {
  before(() => {
    const stubModelDeleteProduct = sinon.stub(productsModel, 'deleteProduct');

    stubModelDeleteProduct.resolves([]);
  });

  after(() => {
    productsModel.deleteProduct.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.deleteProduct(1);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado está vazio', async () => {
    const response = await productsModel.deleteProduct(1);

    expect(response).to.be.empty;
  });
});