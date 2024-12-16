const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const apiLimiter = require('./middleware/rateLimiter');
const logger = require('./middleware/logger');
const { fetchToken } = require('./delete_this/mockTokenGenerator');
const { fetchProduct } = require('./delete_this/mockTokenGenerator');
const { populateDB } = require('./delete_this/populateUsers');

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URL + process.env.MONGO_DATABASE;
console.log(MONGO_URI);

app.use(express.json());
app.use(logger);
//app.use(apiLimiter);
app.use(cors());

app.use('/', orderRoutes);

//For testing only! remove this later
app.use('/', fetchToken);
app.use('/', fetchProduct);

app.use(errorHandler);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  //For testing only! remove this later
  populateDB();

}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.listen(3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});