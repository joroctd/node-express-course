const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name required']
	},
	price: {
		type: Number,
		required: [true, 'price required']
	},
	featured: {
		type: Boolean,
		default: false
	},
	rating: {
		type: Number,
		default: 4.5
		// TODO: add restriction of 0-5
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	company: {
		type: String,
		enum: {
			values: ['ikea', 'marcos', 'liddy', 'caressa'],
			message: '{VALUE} is not supported'
		}
	}
});

module.exports = model('Product', productSchema);
