const Product = require('../models/product');

module.exports = {
	getAllProductsStatic: async (req, res) => {
		const products = await Product.find({});
		res.status(200).json({ products, nbHits: products.length });
	},
	getAllProducts: async (req, res) => {
		const queryObject = {};

		const { featured, company, name, sort, fields, numericFilters } = req.query;
		// http://localhost:5000/api/v1/products?featured=true
		if (featured) queryObject.featured = featured === 'true';
		// http://localhost:5000/api/v1/products?company=liddy
		if (company) queryObject.company = company;
		// http://localhost:5000/api/v1/products?name=al
		if (name) queryObject.name = { $regex: name, $options: 'i' };

		// http://localhost:5000/api/v1/products?numericFilters=price%3E=20,rating%3C5
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte'
		};
		const buildRegExString = searches => `\\b${searches.join('|')}\\b`; // '|' is a special regex character that separates matches
		const regEx = new RegExp(buildRegExString(Object.keys(operatorMap)), 'g'); // used to search for keys ('>', '<', etc.)
		const separator = '-'; // our own special character used to split parts of our filter
		const filters = numericFilters.replace(
			regEx,
			operator => `${separator}${operatorMap[operator]}${separator}` // example: 'price>20' turns into 'price-$gt-20'
		);
		const options = ['price', 'rating']; // field options
		filters.split(',').forEach(filter => {
			// each filter is something like 'price-$gt-20'
			const [field, operator, value] = filter.split(separator); // example: ['price', '$gt', '20']
			if (!options.includes(field)) return;

			const num = Number(value);
			if (isNaN(num)) return;

			queryObject[field] = { [operator]: num }; // example: queryObject['price'] = { '$gt': 20 } (which Mongo accepts and compares for us)
		});

		const products = Product.find(queryObject);
		// http://localhost:5000/api/v1/products?sort=price,name
		products.sort(sort ? sort.split(',').join(' ') : 'createdAt');

		// http://localhost:5000/api/v1/products?fields=price,name
		if (fields) products.select(fields.split(','));

		// API would usually pass page info as well, so that you can get page 1, 2, etc.
		let { page, limit } = req.query;
		page = Number(page) || 1;
		limit = Number(limit) || 10;
		const skip = (page - 1) * limit;
		products.skip(skip).limit(limit);

		res.status(200).json({ products: await products, nbHits: products.length });
	}
};
