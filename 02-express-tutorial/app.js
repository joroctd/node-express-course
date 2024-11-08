const express = require('express');
const { products, people } = require('./data.js');

const app = express();

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
	res.json({ message: 'It worked!' });
});

app.get('/api/v1/products', (req, res) => {
	res.json(products);
});

const prodIdStr = 'productID';
app.get(`/api/v1/products/:${prodIdStr}`, (req, res) => {
	const productId = parseInt(req.params[prodIdStr]);
	const product = products.find(p => p.id === productId);
	if (product === undefined) {
		res.status(404).send({ message: 'That product was not found.', productId });
	} else res.json(product);
});

// app.post('/', (req, res) => {});

app.all('*', (req, res) => {
	const fullPath = req.baseUrl + req.path;
	res.status(404).send(`
        <h2>${fullPath} not found.</h2>
        <p>Go back <a href="/">home</a>?</p>
    `);
});

const port = 5000;
app.listen(port, err => {
	if (err) throw err;
	console.log(`Server listening on port ${port}.`);
	console.log(`Access at: http://localhost:${port}`);
});
