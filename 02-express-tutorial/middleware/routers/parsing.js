const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(
	express.urlencoded({ extended: false }),
	express.json(),
	cookieParser()
);

module.exports = router;
