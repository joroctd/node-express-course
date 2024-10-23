const { writeFile } = require('node:fs');

const filePath = './temporary/fileB.txt';
const lineLimit = 3;
let line = 1;

const createWriteCallback = (flag = 'w') => {
	return (err, res) => {
		if (err) {
			console.error(err);
			return;
		}

		if (line <= lineLimit) {
			console.log(`Attempting to write line ${line}...`);
			writeFile(
				filePath,
				`Line ${line++}\n`,
				{ flag },
				createWriteCallback('a')
			);
		} else {
			console.log(`Successfully met line limit of ${lineLimit}.`);
		}
	};
};

createWriteCallback()();
