const dotenv = require('dotenv');
dotenv.config();
const { PORT, JWT_SECRET } = process.env;

const express = require('express');
const server = express();

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const { client, getUserById } = require('./db');
client.connect();

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
