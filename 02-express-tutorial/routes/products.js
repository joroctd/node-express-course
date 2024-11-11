const express = require('express');
const router = express.Router();
const { getProducts, getProduct } = require('../controllers/products');
const { PRODUCT_ID_STR } = require('../constants');

router.get('/', getProducts);
router.get(`/:${PRODUCT_ID_STR}`, getProduct);

module.exports = router;
