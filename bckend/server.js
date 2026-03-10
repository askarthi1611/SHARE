require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const blogRoutes = require('./routes/blog.routes');
const expenseRoutes = require('./routes/expense.routes');
const eventRoutes = require('./routes/event.routes');
const reminderRoutes = require('./routes/reminder.routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'));
// ✅ fallback
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  );
});
app.use('/api/blogs', blogRoutes);
app.use('/api/events', eventRoutes)
app.use('/api/expenses', expenseRoutes)

app.use('/api/reminders',reminderRoutes)

app.listen(process.env.PORT || 3000);
