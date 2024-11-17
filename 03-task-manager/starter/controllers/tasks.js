import Task from '../models/Task.js';

const getTasks = async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
};

const handleTaskandResponse = (task, res) => {
	if (!task) {
		res.status(404).json({ message: `No task with id : ${taskID}` });
		return;
	}

	res.status(200).json({ task });
};

const getTask = async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });

	handleTaskandResponse(task, res);
};

const updateTask = async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true
		// TODO: enable and add validation in schema/model
		// runValidators: true
	});

	handleTaskandResponse(task, res);
};

const deleteTask = async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });

	handleTaskandResponse(task, res);
};

export { getTasks, getTask, createTask, updateTask, deleteTask };
