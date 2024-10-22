// accepts only one of function args OR CLI args
const log = (...args) => {
	if (args.length === 0) {
		// skips the execution path and this file's path
		args = args.concat(process.argv.slice(2));
		if (args.length === 0) {
			args.push('You can also feed input to this script via the command line.');
		}
	}
	args.forEach(arg => {
		console.log(arg);
	});
};

log();

module.exports = log;
