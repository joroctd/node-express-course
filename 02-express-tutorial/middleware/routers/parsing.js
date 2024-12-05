import express from 'express';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(
	express.urlencoded({ extended: false }),
	express.json(),
	cookieParser()
);

export default router;
