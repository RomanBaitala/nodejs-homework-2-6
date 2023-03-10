const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDB = process.env.DB_HOST;

mongoose.set('strictQuery', true);

mongoose
  .connect(uriDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
