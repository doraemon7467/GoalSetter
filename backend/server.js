const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//middleware so that we can access the req.body in POST reqs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow requests from specific origins
const corsOptions = {
  origin: 'https://goal-setter-eta.vercel.app/login',
  // You can also use an array to allow multiple origins:
  // origin: ['https://goal-setter-eta.vercel.app', 'https://other-domain.com'],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

//override the default ecpress error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));