import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import registerRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productsRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import { connectDB } from './config/db.js';

const app = express();

app.use(express.json());

app.use(cors())
app.use(morgan("common"))

app.use('/api', registerRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)


// connect to mongodb database
connectDB();


const port = 7000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});