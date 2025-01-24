const fs = require('node:fs');
const path = require('node:path');

const acceptedFileTypes = ['.js', '.json'].reduce(
	(typeObject, fileType) => ({
		...typeObject,
		[fileType]: fileType
	}),
	{}
);
const requireAll = (directory, pathToDirectory = '../') => {
	const required = {};
	fs.readdirSync(directory).forEach(file => {
		const filePath = path.join(directory, file);
		if (fs.statSync(filePath).isDirectory()) {
			required[file] = requireAll(filePath);
			return;
		}

		const fileType = acceptedFileTypes[path.extname(file)];
		if (!fileType) return;

		required[path.basename(file, fileType)] = require(path.join(
			pathToDirectory,
			directory,
			file
		));
	});
	return required;
};

module.exports = requireAll;
