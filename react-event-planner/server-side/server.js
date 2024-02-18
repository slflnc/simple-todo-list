const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const eventsRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import routes
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
