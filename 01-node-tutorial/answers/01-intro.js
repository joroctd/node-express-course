const log = require('./05-utils.js');

const cliLog = () => {
	// skips the execution path and this file's path
	const args = process.argv.slice(2);
	if (args.length === 0) {
		args.push('You can also feed input to this script via the command line.');
	}
	log(...args);
};

cliLog();
