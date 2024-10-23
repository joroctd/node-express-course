const { writeFile } = require('node:fs');

const filePath = './temporary/fileB.txt';
let line = 1;
const lineLimit = 3;

const writeLines = (flag = 'a') => (
	(err, res) => {
		if (err) {
			console.error(err);
			return;
		}

		if (line <= lineLimit) {
			console.log(`Attempting to write line ${line}...`);
			writeFile(filePath, `Line ${line++}\n`, { flag }, writeLines('w'));
		}
	}
);

writeLines()();
