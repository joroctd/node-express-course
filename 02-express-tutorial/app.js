import express from 'express';
import {
	securityRouter,
	parsingRouter,
	logger,
	auth
} from './middleware/index.js';
import {
	productsRouter,
	peopleRouter,
	testRouter,
	authRouter
} from './routes/index.js';

const app = express();

app.use(express.static('./public'));
app.use(securityRouter, parsingRouter, logger);

app.use('/', authRouter);
app.use('/test', auth, testRouter);

const apiRouter = express.Router();
app.use('/api/v1', apiRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/people', peopleRouter);

app.all('*', (req, res) => {
	const fullPath = req.baseUrl + req.path;
	res.status(404).send(`
        <h2>${fullPath} not found.</h2>
        <p>Go back <a href="/">home</a>?</p>
    `);
});

const port = 5000;
app.listen(port, err => {
	if (err) {
		console.error(`Could not start server on port ${port}.`);
		throw err;
	}
	console.log(`Server listening on port ${port}.`);
	console.log(`Access at: http://localhost:${port}`);
});
