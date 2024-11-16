import express from 'express';
const router = express.Router();
import getTest from '../controllers/test.js';

router.get('/', getTest);

export default router;
