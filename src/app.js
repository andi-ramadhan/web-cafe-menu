const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/menu', require('./routes/menu.routes'));

module.exports = app;