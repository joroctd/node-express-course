import express from 'express';
const router = express.Router();
import { getProducts, getProduct } from '../controllers/products.js';
import { constants } from '../data.js';
const { PRODUCT_ID_STR } = constants;

router.get('/', getProducts);
router.get(`/:${PRODUCT_ID_STR}`, getProduct);

export default router;
