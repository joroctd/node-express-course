import express from 'express';

import {
	getTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask
} from '../controllers/tasks.js';

const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default router;
