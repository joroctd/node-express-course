const { writeFile, readFile } = require('node:fs').promises;

const filePath = './temporary/temp.txt';

const writer = async () => {
	const lineLimit = 3;
	let line = 0;
	while (line < lineLimit) {
		let flag = line <= 0 ? 'w' : 'a';
		try {
			await writeFile(filePath, `Line ${++line}\n`, { flag });
		} catch (err) {
			console.error(err);
			return;
		}
	}
};

const reader = async () => {
	const fileContents = (await readFile(filePath)).toString();
	console.log(fileContents);
};

const readWrite = async () => {
	await writer();
	await reader();
};

readWrite();
