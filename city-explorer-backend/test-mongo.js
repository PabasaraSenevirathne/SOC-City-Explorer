const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI) // no options needed in Mongoose 7+
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('Connection Error:', err));
