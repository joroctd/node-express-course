import Task from '../models/Task.js';

const getTasks = async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
	const { name } = req.body;
	if (!name) {
		res.status(400).json({ message: 'A name is required for new tasks.' });
		return;
	}

	const task = await Task.create({ name });
	res.status(201).json({ task });
};

const handleTaskandResponse = (task, taskID, res) => {
	if (!task) {
		res.status(404).json({ message: `No task with id: ${taskID}` });
		return;
	}

	res.status(200).json({ task });
};

const getTask = async (req, res) => {
	const { id: taskID } = req.params;
	try {
		const task = await Task.findById(taskID);
		handleTaskandResponse(task, taskID, res);
	} catch {
		res.status(400).json({ message: 'Malformed ID.' });
		return;
	}
};

const updateTask = async (req, res) => {
	const { id: taskID } = req.params;
	const { name, completed } = req.body;

	if (!name && completed === undefined) {
		res.status(400).json({ message: 'No name or completion status provided.' });
		return;
	}

	const newTask = {};
	if (name) newTask.name = name;
	if (completed !== undefined) newTask.completed = completed;

	try {
		const task = await Task.findByIdAndUpdate(taskID, newTask, {
			new: true
			// TODO: enable and add validation in schema/model
			// runValidators: true
		});
		handleTaskandResponse(task, taskID, res);
	} catch {
		res.status(400).json({ message: 'Malformed ID.' });
		return;
	}
};

const deleteTask = async (req, res) => {
	const { id: taskID } = req.params;
	try {
		const task = await Task.findByIdAndDelete(taskID);
		handleTaskandResponse(task, taskID, res);
	} catch {
		res.status(400).json({ message: 'Malformed ID.' });
		return;
	}
};

export { getTasks, getTask, createTask, updateTask, deleteTask };
