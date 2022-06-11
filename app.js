const express = require('express');

const app = express();

const productsRoutes = require('./routers/productsRoutes');
const salesRoutes = require('./routers/salesRoutes');

const error = require('./middlewares/error');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(error);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
