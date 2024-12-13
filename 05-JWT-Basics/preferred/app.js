const express = require('express');
const app = express();
const requireAll = require('./util/requireAll');

app.use(express.static('./public'));
app.use(express.json());

process.loadEnvFile('./.env');
const {
	auth,
	routers: { security },
	errorHandler,
	notFound
} = requireAll('./middleware');
const apiRouter = express.Router();
app.use('/api/v1', security, apiRouter);

const { hello, dashboard, logon } = requireAll('./routes');
apiRouter.use('/logon', logon);
apiRouter.use('/hello', auth, hello);
apiRouter.use('/dashboard', auth, dashboard);

apiRouter.use(errorHandler);
app.use(notFound);

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
