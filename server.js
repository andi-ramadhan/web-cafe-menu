require('dotenv').config();

const express = require('express')
const app = express();
const menuRoutes = require('./src/routes/menu.routes');

const port = process.env.PORT

app.use('/', menuRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})