const os = require('node:os');
const log = require('./05-utils.js');

const divideConvert = (num, modifier, times = 1) => {
	if (modifier <= 0) {
		console.error(
			'The modifier parameter in the divideConvert function has been misused.'
		);
		return num;
	}
	for (let i = 0; i < times; i++) {
		num /= modifier;
	}
	return Math.round(num);
};

log(
	`Current uptime: ${divideConvert(os.uptime(), 60)} minutes`,
	`Currently free memory: ${divideConvert(os.freemem(), 1024, 3)} gigabytes`,
	`Total memory: ${divideConvert(os.totalmem(), 1024, 3)} gigabytes`
);
