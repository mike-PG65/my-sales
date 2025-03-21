import { createProduct, getProducts, getProductById, updateById, deleteProduct} from "../controllers/products.js";
import express from 'express';

const router = express.Router()


router.post('/add-product', createProduct)
router.get('/products', getProducts)
router.get('/product/:id', getProductById)
router.put('/updateproduct/:id', updateById)
router.delete('/deleteproduct/:id', deleteProduct)


export default router;