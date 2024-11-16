import express from 'express';
const router = express.Router();
import { logon, logoff } from '../controllers/auth/index.js';

router.post('/logon', logon);
router.delete('/logoff', logoff);

export default router;
