const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db');
const salesModel = require('../../../models/salesModel');

describe('Testando o sales model quando não existe nenhuma venda', () => {
  before(() => {
    const datasales = [['']];

    sinon.stub(connection, 'execute').resolves(datasales);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await salesModel.getAllSales();

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado está vazio', async () => {
    const [response] = await salesModel.getAllSales();

    expect(response).to.be.empty;
  });
});

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

describe('Testando o sales model quando existem vendas', () => {
  before(() => {

    sinon.stub(connection, 'execute').resolves(dataSales);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se o retorno é um objeto', async () => {
    const response = await salesModel.getAllSales();

    expect(response).to.be.an('object');
  });

  it('Testa se o objeto retornado não está vazio', async () => {
    const response = await salesModel.getAllSales();

    expect(response).to.not.be.empty;
  });

  it('Testa se os objetos possuem as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
    const response = await salesModel.getAllSales();

    expect(response).to.include.all.keys(
      'saleId',
      'date',
      'productId',
      'quantity',
    );
  });
});

describe('Testando o sales model getById', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute').resolves(dataSales);

    stubConnectionExecute.onCall(0).resolves([dataSales[0]]);
    stubConnectionExecute.onCall(1).resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se a funçaõ retorna uma venda por id', async () => {
    const response = await salesModel.getByIdSale(1);

    expect(response).to.have.property('saleId');
    expect(response).to.have.property('date');
    expect(response).to.have.property('productId');
    expect(response).to.have.property('quantity');
  });

  it('Testa se o retorno é um array vazio caso não exista venda com o id especifico', async () => {
    const response = await salesModel.getByIdSale(4);

    expect(response).to.be.empty;
  });
});

describe('Testando o sales model newSale', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute').resolves(dataSales);

    stubConnectionExecute.resolves([{ insertId: 4 }]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é possível criar uma venda', async () => {
    const response = await salesModel.newSale([{
        "saleId": 4,
        "date": "2022-06-08T18:08:00.000Z",
        "productId": 4,
        "quantity": 4
    }]);

    expect(response).to.have.property('id');
    expect(response).to.have.property('itemsSold');
  });
});

describe('Testando o sales model editSale', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é possível atualizar uma venda', async () => {
    const response = await salesModel.editSale(1, [{
        "productId": 5,
        "quantity": 5
    }]);

    expect(response).to.have.property('saleId');
    expect(response).to.have.property('itemUpdated');
  });
});

describe('Testando o sales model deleteSale', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é possível deletar uma venda', async () => {
    const response = await salesModel.deleteSale(1);

    expect(response).to.be.undefined;
  });
});