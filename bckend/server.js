require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const blogRoutes = require('./routes/blog.routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'));

app.use('/api/blogs', blogRoutes);

app.listen(process.env.PORT || 3000);
