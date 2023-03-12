const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Bad request',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  // console.log(err.stack);
  res.status(err.status).json({
    status: 'failed',
    code: err.status,
    message: err.message,
  });
});

module.exports = app;
