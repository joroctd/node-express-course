const Product = require('../models/product');

module.exports = {
	getAllProductsStatic: async (req, res) => {
		const products = await Product.find({});

		res.status(200).json({ products, nbHits: products.length });
	},
	getAllProducts: async (req, res) => {
		const { featured, company, name, sort, fields, numericFilters } = req.query;
		let { page, limit } = req.query;
		const queryObject = {};

		if (featured) queryObject.featured = featured === 'true';
		if (company) queryObject.company = company;
		if (name) queryObject.name = { $regex: name, $options: 'i' };
		if (numericFilters) {
			const operatorMap = {
				'>': '$gt',
				'>=': '$gte',
				'=': '$eq',
				'<': '$lt',
				'<=': '$lte'
			};
			const buildRegExString = searches => `\\b${searches.join('|')}\\b`;
			const regEx = new RegExp(buildRegExString(Object.keys(operatorMap)), 'g');
			const separator = '-';
			const filters = numericFilters.replace(
				regEx,
				operator => `${separator}${operatorMap[operator]}${separator}`
			);
			const options = ['price', 'rating'];
			filters.split(',').forEach(filter => {
				const [field, operator, value] = filter.split(separator);
				if (!options.includes(field)) return;

				const num = Number(value);
				if (isNaN(num)) return;

				queryObject[field] = { [operator]: num };
			});
		}

		let products = Product.find(queryObject);
		products = products.sort(sort ? sort.split(',').join(' ') : 'createdAt');

		if (fields) products.select(fields.split(','));

		page = Number(page) || 1;
		limit = Number(limit) || 10;
		const skip = (page - 1) * limit;
		products = products.skip(skip).limit(limit);

		products = await products;
		res.status(200).json({ products, nbHits: products.length });
	}
};
