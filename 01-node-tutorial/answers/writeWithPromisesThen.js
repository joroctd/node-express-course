const { writeFile, readFile } = require('node:fs').promises;

const filePath = './temporary/temp.txt';

let line = 0;
const getLine = () => `Line ${++line}\n`;
const writeSecondaryLine = () => writeFile(filePath, getLine(), { flag: 'a' });

writeFile(filePath, getLine())
	.then(writeSecondaryLine)
	.then(writeSecondaryLine)
	.then(() => readFile(filePath))
	.then(res => console.log(res.toString()))
	.catch(err => console.error(err));
