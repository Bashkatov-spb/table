require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

const PORT = 4000;
app.use(express.static(path.join(__dirname, '../frontend/build')));
const apiRouter = require('./api/api.routes');

app.use(fileUpload());
app.use(express.json());

app.use(morgan('dev'));
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Шуршим на ${PORT} порту`);
});
