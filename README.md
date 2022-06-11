# Store Manager

## O que foi desenvolvido

Uma API no padrão REST onde é possível adicionar, ler, deletar e atualizar produtos no estoque; Também é possível enviar vendas para o sistema e essas vendas validam se o produto em questão existe; Ler, deletar e atualizar uma ou mais vendas.

## Desenvolvimento

Após desenvolver a API utilizei o **mocha**, **chai** e **sinon** para escrever os testes unitários das camadas MSC: `models`, `services` e `controllers` dentro da pasta `test/unit`.

## Tecnologias utilizadas

`Node.JS`, `Docker` e `MySQL`

## Instalando depedências

cd store-manager
npm install

## Executando a aplicação

cd store-manager
npm run debug

## Arquivos disponibilizados pela Trybe

A Trybe disponibilizou o banco de dados StoreManager.sql e o docker-compose.