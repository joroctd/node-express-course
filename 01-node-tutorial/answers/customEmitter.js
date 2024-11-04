const EventEmitter = require('node:events');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('child_process');
const { exit } = require('node:process');

const emitter = new EventEmitter();

const directory = path.join(__dirname, 'temporary');
fs.watch(directory, (eventType, fileName) => {
	if (eventType === 'change') {
		emitter.emit('fileChange', {
			directory,
			fileName,
			timestamp: new Date()
		});
	}
});

emitter.on('fileChange', ({ directory, fileName, timestamp }) => {
	console.log(`\nFile changed in ${directory}: ${fileName}`);
	console.log(`Changed at: ${timestamp}\n`);
});

const scriptPath = './createBigFile.js';
console.log(
	`Executing ${scriptPath}...
(if you see no events, try running from /answers)`
);
execFile('node', [scriptPath], () => {
	exit();
});
