const path = require('path');
const compression = require('compression');
const express = require('express');
const routes = require('./routes.js');

const app = express();

// app.use(express.urlencoded());
// app.use(express.static(path.join(__dirname, '/../build')));
app.use(compression());
app.use(express.json());
app.use('/SDC/api/', routes);

console.log('Listening on port 3000');
app.listen(3000);