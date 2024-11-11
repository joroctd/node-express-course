const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const { productsRouter, peopleRouter } = require('./routes');

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
const apiRouter = express.Router();

apiRouter.use(express.urlencoded({ extended: false }), express.json());

apiRouter.get('/test', (req, res) => {
	res.json({ message: 'It worked!' });
});

// add people and product routers
apiRouter.use('/products', productsRouter);
apiRouter.use('/people', peopleRouter);

app.use('/api/v1', apiRouter);

app.all('*', (req, res) => {
	const fullPath = req.baseUrl + req.path;
	res.status(404).send(`
        <h2>${fullPath} not found.</h2>
        <p>Go back <a href="/">home</a>?</p>
    `);
});

const port = 5000;
app.listen(port, err => {
	if (err) {
		console.error(`Could not start server on port ${port}.`);
		throw err;
	}
	console.log(`Server listening on port ${port}.`);
	console.log(`Access at: http://localhost:${port}`);
});
