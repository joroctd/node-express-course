import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	name: {},
	completed: {}
});

export default mongoose.model('Task', TaskSchema);
