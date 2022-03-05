const path = require('path');
const express = require('express');
const routes = require('./routes.js');

const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, '/../build')));
app.use('/SDC/api/', routes);

console.log('Listening on port 3000');
app.listen(3000);