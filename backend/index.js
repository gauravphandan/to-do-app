import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';

const app = express();
const PORT = 8000;

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

// error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://gauravphandanjune:EjBT9lr9Xn1HT3W3@to-do-app.mrow41b.mongodb.net/?retryWrites=true&w=majority&appName=to-do-app");
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
