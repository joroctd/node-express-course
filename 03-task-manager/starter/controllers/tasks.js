import Task from '../models/Task.js';
import asyncWrapper from '../middleware/asyncWrapper.js';
import { createApiError } from '../errors/ApiError.js';

const getTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
	const { name } = req.body;
	if (!name) {
		next(createApiError('A name is required for new tasks.', 400));
		return;
	}

	const task = await Task.create({ name });
	res.status(201).json({ task });
});

const handleTaskandResponse = (task, taskID, res, next) => {
	if (!task) {
		next(createApiError(`No task with id: ${taskID}`, 404));
		return;
	}

	res.status(200).json({ task });
};

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findById(taskID);
	handleTaskandResponse(task, taskID, res, next);
});

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const { name, completed } = req.body;

	if (!name && completed === undefined) {
		next(createApiError('No name or completion status provided.', 400));
		return;
	}

	const newTask = {};
	if (name) newTask.name = name;
	if (completed !== undefined) newTask.completed = completed;

	const task = await Task.findByIdAndUpdate(taskID, newTask, {
		new: true,
		runValidators: true
	});
	handleTaskandResponse(task, taskID, res, next);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndDelete(taskID);
	handleTaskandResponse(task, taskID, res, next);
});

export { getTasks, getTask, createTask, updateTask, deleteTask };
