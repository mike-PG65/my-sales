import { addSupplier, supplierList, supplier } from "../controllers/suppliers.js";
import express from 'express'
const router = express.Router()

router.post('/addsupplier', addSupplier)
router.get('/suppliers', supplierList)
router.get('/supplier/:id', supplier)

export default router