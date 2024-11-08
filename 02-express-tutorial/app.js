const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const { products, people } = require('./data.js');

const app = express();

app.use(express.static('./public'));

/* Security middleware: */
// HPP: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#prevent-http-parameter-pollution
app.use(hpp());
// Helmet: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-appropriate-security-headers
app.use(
	helmet.frameguard(),
	helmet.xssFilter(),
	helmet.noSniff(),
	helmet.hidePoweredBy()
);

/* Routes: */
app.get('/api/v1/test', (req, res) => {
	res.json({ message: 'It worked!' });
});

app.get('/api/v1/products', (req, res) => {
	let { search, limit, maxPrice, minPrice } = req.query;
	let queriedProducts = products;

	// query logic
	if (search !== undefined) {
		queriedProducts = queriedProducts.filter(p => p.name.startsWith(search));
	}
	const filterByPrice = (price, createCompareCb) => {
		if (price !== undefined) {
			price = parseFloat(price);
			queriedProducts = queriedProducts.filter(createCompareCb(price));
		}
	};
	filterByPrice(maxPrice, price => prod => prod.price <= price);
	filterByPrice(minPrice, price => prod => prod.price >= price);

	if (limit !== undefined) {
		limit = parseInt(limit);
		queriedProducts = limit < 0 ? [] : queriedProducts.slice(0, limit);
	}
	res.json(queriedProducts);
});

const prodIdStr = 'productID';
app.get(`/api/v1/products/:${prodIdStr}`, (req, res) => {
	const productId = parseInt(req.params[prodIdStr]);
	const product = products.find(p => p.id === productId);
	if (product === undefined) {
		res.status(404).json({ message: 'That product was not found.', productId });
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
