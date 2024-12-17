import mongoose from 'mongoose';

const maxTaskNameLength = 20;

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A name is required.'],
		trim: true,
		// https://mongoosejs.com/docs/api/schematype.html#error-message-templates
		validate: {
			validator: value => value.length <= maxTaskNameLength,
			message: props => `${props.value.length} longer than ${maxTaskNameLength}`
		}
		// maxLength: [
		// 	maxTaskNameLength,
		// 	`Must be at most ${maxTaskNameLength}; {VALUE} too long.`
		// ]
	},
	completed: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model('Task', TaskSchema);
