import express from 'express';
import connectDatabase from './utils/connectDatabase.js';
import tasksRouter from './routes/tasks.js';

const app = express();
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);

process.loadEnvFile('./.env');

const port = process.env.PORT || 5000;
const main = async () => {
	try {
		await connectDatabase(process.env.MONGO_URI);
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

export default app;
