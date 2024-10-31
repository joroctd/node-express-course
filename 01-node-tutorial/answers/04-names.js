const fs = require('node:fs');

const fileNames = fs
	.readdirSync('./')
	.filter(fileName => fileName.endsWith('.js'));

module.exports = fileNames.reduce((acc, cur) => ({ ...acc, [cur]: cur }), {});
