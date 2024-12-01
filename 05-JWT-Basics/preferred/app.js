const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use(express.json());

process.loadEnvFile('./.env');
const port = process.env.PORT || 3000;
const main = async () => {
	try {
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
