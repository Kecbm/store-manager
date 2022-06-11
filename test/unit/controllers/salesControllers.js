const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/salesControllers');
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

describe('Testando o sales controller getAll', () => {

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales').resolves([]);
  });

  after(() => {
    salesService.getAllSales.restore();
  });

  it('Testa quando não existem vendas', async () => {
    await salesController.getAllSales(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});

describe('Testando o sales controller getAll', () => {

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales').resolves(dataSales);
  });

  after(() => {
    salesService.getAllSales.restore();
  });

  it('Testa quando existem vendas', async () => {
    await salesController.getAllSales(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});