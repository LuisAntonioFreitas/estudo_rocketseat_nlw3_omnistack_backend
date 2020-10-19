import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import './database/connection';

import env from './env';
import routes from './routes';
import errorHandler from './errors/handler';

// Acesso a banco de dados
const app = express();

// favicon
// var favicon = require('serve-favicon'), path = require("path");
// app.use(favicon(path.join(__dirname, "/images/favicon.png")));

app.use("/favicon.png", express.static('/public/favicon.png'));

// Acesso a partir de outros endereços
app.use(cors());

// Faz o app usar o formato JSON
app.use(express.json());

// Define variáveis de ambiente
process.env.NODE_ENV = env;

// Define rotas
app.use(routes);
app.use('/', express.static(path.join(__dirname, '..', 'public')))
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
// Define erros
app.use(errorHandler);

// Ex.: http://localhost:3333/
app.listen(process.env.NODE_SERVER_PORT);

// Log
console.log(process.env.NODE_APP_NAME);
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_URL_UPDATES);


// req | res
// localhost:3333

// EXEMPLOS e EXPLICAÇÕES

// ROTA
// Recurso : users

// Métodos HTTP: get, post, put, delete

// GET    = Buscando uma informação existentes (Lista, Item, etc)
// POST   = Criando ou Incluindo uma nova informação
// PUT    = Editando ou Atualizando uma informação existentes
// DELETE = Deletando ou Apagando uma informação existentes

// Parâmetros: request.headers, request.body, request.params, request.query

// Headers: ?
// Body (Request Body): Dados para criação ou atualização de um registro
//                      Ex: http://localhost:3333/users
// Route Params: Identificar qual dado eu vou atualizar ou deletar
//               Ex: '/users/:id'
//               Ex: http://localhost:3333/users/1
// Query Params: Filtros, paginação, ordenação
//               Ex: '/users/?page=2&order=name'
//               Ex: http://localhost:3333/users?page=2&order=name

// app.get('/', (request, response) => {
//   return response.json({ message: 'Hello World' });
// })

// app.get('/users', (request, response) => {
//   console.log(request.headers);
//   console.log(request.body);
//   console.log(request.params);
//   console.log(request.query);

//   const users = [
//     { name: 'Diego', age: 25 },
//     { name: 'Vini', age: 21 },
//     { name: 'Dani', age: 23 },
//   ];

//   return response.json(users);
// });
