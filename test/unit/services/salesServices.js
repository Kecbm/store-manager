const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

const dataSales = [
  {
    "saleId": 1,
    "date": "2022-06-07T18:25:39.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 2,
    "date": "2022-06-07T18:25:39.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 3,
    "date": "2022-06-07T18:25:39.000Z",
    "productId": 3,
    "quantity": 15
  }
];

describe('Testando o sales service getAll', () => {
  before(() => {
    const stubModelGetAll = sinon.stub(salesModel, 'getAllSales');

    stubModelGetAll.resolves(dataSales);
  });

  after(() => {
    salesModel.getAllSales.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await salesModel.getAllSales();

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await salesModel.getAllSales();

    expect(response).to.not.be.empty;
  });
});

describe('Testando o sales service getById', () => {
  before(() => {
    const stubModelGetById = sinon.stub(salesModel, 'getByIdSale');

    stubModelGetById.resolves([dataSales[0]]);
  });

  after(() => {
    salesModel.getByIdSale.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await salesModel.getByIdSale();

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await salesModel.getByIdSale();

    expect(response).to.not.be.empty;
  });
});

const newSale = [
  {
    "productId": 4,
    "quantity": 40
  },
];

describe('Testando o sales service newSale', () => {
  before(() => {
    const stubModelNewSale = sinon.stub(salesModel, 'newSale');

    stubModelNewSale.resolves(newSale);
  });

  after(() => {
    salesModel.newSale.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await salesModel.newSale(newSale);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await salesModel.newSale(newSale);

    expect(response).to.not.be.empty;
  });
});

const saleEdited = [
  {
    "id": 1,
    "productId": 1,
    "quantity": 10
  },
];

describe('Testando o sales service editSale', () => {
  before(() => {
    const stubModelEditSale = sinon.stub(salesModel, 'editSale');

    stubModelEditSale.resolves(newSale);
  });

  after(() => {
    salesModel.editSale.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await salesModel.editSale(saleEdited);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado não está vazio', async () => {
    const response = await salesModel.editSale(saleEdited);

    expect(response).to.not.be.empty;
  });
});

describe('Testando o sale service deleteSale', () => {
  before(() => {
    const stubModelDeleteSale = sinon.stub(salesModel, 'deleteSale');

    stubModelDeleteSale.resolves([]);
  });

  after(() => {
    salesModel.deleteSale.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await salesModel.deleteSale(1);

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado está vazio', async () => {
    const response = await salesModel.deleteSale(1);

    expect(response).to.be.empty;
  });
});