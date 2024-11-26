const fs = require('node:fs');
const path = require('node:path');

const acceptedFileType = '.js';
const requireAll = (directory, pathToDirectory = '../') => {
	const required = {};
	fs.readdirSync(directory).forEach(file => {
		const filePath = path.join(directory, file);
		if (fs.statSync(filePath).isDirectory()) {
			required[file] = requireAll(filePath);
			return;
		}

		if (path.extname(file) !== acceptedFileType) return;

		required[path.basename(file, acceptedFileType)] = require(path.join(
			pathToDirectory,
			directory,
			file
		));
	});
	return required;
};

module.exports = requireAll;
