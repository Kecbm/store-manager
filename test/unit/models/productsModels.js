const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db');
const productsModel = require('../../../models/productsModel');

describe('Testando o products model getAll quando não existe nenhum produto', () => {
  before(() => {
    const dataProducts = [['']];

    sinon.stub(connection, 'execute').resolves(dataProducts);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se o retorno é um array', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.be.an('array');
  });

  it('Testa se o array retornado está vazio', async () => {
    const [response] = await productsModel.getAllProducts();

    expect(response).to.be.empty;
  });
});

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
    name: 'Escudo do Capitão Américae',
    quantity: 30,
  },
];

describe('Testando o products model getAll quando existem produtos', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves(dataProducts);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se o retorno é um objeto', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.be.an('object');
  });

  it('Testa se o objeto retornado não está vazio', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.not.be.empty;
  });

  it('Testa se os objetos possuem as propriedades: "id", "name" e "quantity"', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.include.all.keys(
      'id',
      'name',
      'quantity',
    );
  });
});

describe('Testando o products model getById', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute').resolves(dataProducts);

    stubConnectionExecute.onCall(0).resolves([dataProducts[0]]);
    stubConnectionExecute.onCall(1).resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se a funçaõ retorna um produto por id', async () => {
    const response = await productsModel.getByIdProduct(1);

    expect(response).to.have.property('id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('Testa se o retorno é um array vazio caso não exista produto com o id especifico', async () => {
    const response = await productsModel.getByIdProduct(4);

    expect(response).to.be.empty;
  });
});

describe('Testando o products model searchByName', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute').resolves(dataProducts);

    stubConnectionExecute.onCall(0).resolves([dataProducts[0]]);
    stubConnectionExecute.onCall(1).resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se a funçaõ retorna um produto por nome', async () => {
    const response = await productsModel.searchProductByName('Martelo de Thor');

    expect(response).to.have.property('id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('Testa se o retorno é um array vazio caso não exista produto com o nome especifico', async () => {
    const response = await productsModel.searchProductByName('Trybe');

    expect(response).to.be.empty;
  });
});

describe('Testando o products model newProduct', () => {
  before(() => {
    const stubConnectionExecute = sinon.stub(connection, 'execute').resolves(dataProducts);

    stubConnectionExecute.resolves([{ insertId: 4 }]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é possível criar um produto', async () => {
    const response = await productsModel.newProduct({
      name: 'Trybe',
      quantty: 4,
    });

    expect(response).to.have.property('id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });
});

describe('Testando o products model editProduct', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é possível atualizar um produto', async () => {
    const response = await productsModel.editProduct({
      id: 1,
      name: 'Trybe',
      quantty: 4,
    });

    expect(response).to.have.property('id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });
});

describe('Testando o products model deleteProduct', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é possível deletar um produto', async () => {
    const response = await productsModel.deleteProduct(1);

    expect(response).to.be.undefined;
  });
});