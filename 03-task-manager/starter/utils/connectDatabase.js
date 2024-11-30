import mongoose from 'mongoose';

export default uri => {
	return mongoose.connect(uri, {
		autoIndex: true
	});
};
