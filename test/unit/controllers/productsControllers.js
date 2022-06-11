const sinon = require('sinon');
const { expect } = require('chai');
const productsController = require('../../../controllers/productsController');
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

describe('Testando o products controller getAll', () => {

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts').resolves([]);
  });

  after(() => {
    productsService.getAllProducts.restore();
  });

  it('Testa quando não existem produtos', async () => {
    await productsController.getAllProducts(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});

describe('Testando o products controller getAll', () => {

  const response = {};
  const request = {};

  before(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts').resolves(dataProducts);
  });

  after(() => {
    productsService.getAllProducts.restore();
  });

  it('Testa quando existem produtos', async () => {
    await productsController.getAllProducts(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});

describe('Testando o products controller newProduct', () => {

  const response = {};
  const request = {};

  before(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns({  "message": "Product already exists" });

    sinon.stub(productsService, 'searchProductByName').resolves([{}]);
  });

  after(() => {
    productsService.searchProductByName.restore();
  });

  it('Testa o status quando o payload é inválido', async () => {
    await productsController.newProduct(request, response);

    expect(response.status.calledWith(409)).to.be.equal(true);
  });

  it('Testa a menssagem quando o payload é inválido', async () => {
    await productsController.newProduct(request, response);

    expect(response.json.calledWith({  "message": "Product already exists" })).to.be.equal(true);
  });
});

describe('Testando o products controller newProduct', () => {

  const response = {};
  const request = {};

  before(() => {
    request.body = {
      name: 'Roupa da Mulher Maravilha',
      quantity: 40,
    };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns({
      id: 4,
      name: 'Roupa da Mulher Maravilha',
      quantity: 40,
    });

    sinon.stub(productsService, 'newProduct').resolves(true);
  });

  after(() => {
    productsService.newProduct.restore();
  });

  it('Testa o status quando o novo produto é cadastrado', async () => {
    await productsController.newProduct(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});