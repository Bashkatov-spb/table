const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const app = express();

const PORT = 4000;

const apiRouter = require('./api/api.routes');

app.use(fileUpload());
app.use(express.json());

app.use(morgan('dev'));
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Шуршим на ${PORT} порту`);
});
