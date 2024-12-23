import { products, constants } from '../data.js';
const { PRODUCT_ID_STR } = constants;

const getProducts = (req, res) => {
	let { search, limit, maxPrice, minPrice } = req.query;
	let queriedProducts = products;

	if (search !== undefined) {
		queriedProducts = queriedProducts.filter(p => p.name.startsWith(search));
	}

	const filterByPrice = (price, createCompareCallback) => {
		if (price !== undefined) {
			price = parseFloat(price);
			if (isNaN(price)) {
				res.status(400).json('Bad request: provided number was not parseable.');
				return;
			}
			queriedProducts = queriedProducts.filter(createCompareCallback(price));
		}
	};

	filterByPrice(maxPrice, price => prod => prod.price <= price);
	filterByPrice(minPrice, price => prod => prod.price >= price);

	if (limit !== undefined) {
		limit = parseInt(limit);
		if (isNaN(limit)) {
			res.status(400).json('Bad request: provided number was not parseable.');
			return;
		}
		queriedProducts = limit < 0 ? [] : queriedProducts.slice(0, limit);
	}
	res.json(queriedProducts);
};

const getProduct = (req, res) => {
	const id = parseInt(req.params[PRODUCT_ID_STR]);
	const product = products.find(p => p.id === id);

	if (!product) {
		res.status(404).json({ message: 'That product was not found.', id });
		return;
	}

	res.json(product);
};

export { getProducts, getProduct };
