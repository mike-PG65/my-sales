import { createProduct, getproducts } from "../controllers/products.js";
import express from 'express';

const router = express.Router()


router.post('/add-product', createProduct)
router.get('/products', getproducts)


export default router;