import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
dotenv.config();

connectDB();
const app = express();
app.get('/', (req, res) => {
  res.send('Api is running');
});
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `SERVER running on ${process.env.NODE_ENV} MODE listening on port ${PORT}  `
  )
);