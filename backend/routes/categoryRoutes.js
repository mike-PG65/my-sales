import { createCategory, getAllCategories  } from "../controllers/category.js";
import express from 'express';

const router = express.Router()


router.post('/add-category', createCategory);
router.get('/categories', getAllCategories);


export default router;