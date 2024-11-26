const express = require('express');
const app = express();

const requireAll = require('./utils/requireAll');
const { errorHandler, notFound } = requireAll('./middleware');
const connectDatabase = require('./utils/db/connect');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">Go to products</a>');
});

app.get('/api/v1/products', (req, res) => {});

app.use(notFound, errorHandler);

process.loadEnvFile('./.env');
const port = process.env.PORT || 3000;
const main = async () => {
	try {
		await connectDatabase(process.env.MONGO_URI);
		app.listen(port, err => {
			if (err) {
				console.error(`Could not start server on port ${port}.`);
				throw err;
			}
			console.log(`Server listening on port ${port}.`);
			console.log(`Access at: http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};
main();
