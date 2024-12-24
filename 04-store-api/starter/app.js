const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const productRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`<h1>Store API</h1><a href="/api/v1/products">Go to products</a>`);
});

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware, errorHandlerMiddleware);

process.loadEnvFile('.env');
const port = process.env.PORT || 5000;
const main = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, err => {
			if (err) {
				console.error(`Could not start server on port ${port}`);
				throw err;
			}

			console.log(`Server listening on port ${port}`);
			console.log(`Access at: http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

main();
