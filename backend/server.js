import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();
import cors from 'cors';

connectDB();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Api is running');
});
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);
// app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:5173', // Replace with your allowed origin
//     methods: 'GET,POST', // Replace with your allowed methods
//     allowedHeaders: 'Content-Type,Authorization', // Replace with your allowed headers
//   })
// );

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `SERVER running on ${process.env.NODE_ENV} MODE listening on port ${PORT}`
  )
);
