import express from 'express';
import env from "dotenv"

import connectDB from './config/db.js';

import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import imageRoute from './routes/imageRoute.js';

env.config()

const app = express();

await connectDB()

app.use(express.json());


app.use('/uploads', express.static('uploads'));


// porduct route
app.use('/api/product', productRoute);


// category route
app.use('/api/category', categoryRoute);


// image route
app.use('/api/image', imageRoute);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});