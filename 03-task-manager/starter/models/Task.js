import mongoose from 'mongoose';

const nameCharacterLimit = 20;
const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name'],
		trim: true,
		maxlength: [
			nameCharacterLimit,
			`name cannot be more than ${nameCharacterLimit} characters`
		]
	},
	completed: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model('Task', TaskSchema);
