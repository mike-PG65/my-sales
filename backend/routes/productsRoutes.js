import { createProduct } from "../controllers/products.js";
import express from 'express';

const router = express.Router()


router.post('/add-product', createProduct)


export default router;