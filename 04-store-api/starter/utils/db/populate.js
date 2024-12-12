const connectDatabase = require('./connect');
const Product = require('../../models/product');
const productData = require('./products.json');

process.loadEnvFile('./.env');

const populate = async () => {
	try {
		await connectDatabase(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(productData);

		console.log('Products have been cleared and re-populated with test data.');
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

populate();
