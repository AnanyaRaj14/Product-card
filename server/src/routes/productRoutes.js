import express from 'express';
import { generateProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/generate-product', generateProduct);

export default router;
