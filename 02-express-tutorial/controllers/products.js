const { products } = require('../data');
const { PRODUCT_ID_STR } = require('../constants');

const getProducts = (req, res) => {
	let { search, limit, maxPrice, minPrice } = req.query;
	let queriedProducts = products;

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
};

const getProduct = (req, res) => {
	const id = parseInt(req.query[PRODUCT_ID_STR]);
	const product = products.find(p => p.id === id);

	if (!product) {
		res.status(404).json({ message: 'That product was not found.', id });
	} else res.json(product);
};

module.exports = {
	getProducts,
	getProduct
};
