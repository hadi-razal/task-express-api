import express from 'express';
import testRoute from './routes/test.js';

const app = express();

app.use(express.json());
app.use('/api/test', testRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});