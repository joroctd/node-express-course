const log = require('./05-utils.js');

try {
	// requires Node v20.12.0 or newer
	process.loadEnvFile('../.env');
} catch (err) {
	console.error(
		'To use the .env file with this script, please update Node to v20.12.0 or newer.'
	);
}

log(__dirname, process.env.MY_VAR);
