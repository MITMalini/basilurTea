const express = require('express');
const mongoose = require('mongoose');
const operatorsRoutes= require('./routes/operators.routes.js');
const errorsRoutes= require('./routes/errors.routes.js');
const cors =require('cors');

require('dotenv').config();

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/operators', operatorsRoutes);
app.use('/api/errors', errorsRoutes);

// connect to db
const dotenv = require('dotenv');
dotenv.config({path:'config.env'});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connection successful');
  })
  .catch((error) => {
    console.log(error);
  });

//port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

