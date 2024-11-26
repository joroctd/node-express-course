const Product = require('../models/product');

module.exports = {
	getAllProductsStatic: async (req, res) => {
		const products = await Product.find({
			featured: true
		});

		res.status(200).json({ products, nbHits: products.length });
	},
	getAllProducts: async (req, res) => {
		const {} = req.query;

		const products = await Product.find({});
		res.status(200).json({ products, nbHits: products.length });
	}
};
