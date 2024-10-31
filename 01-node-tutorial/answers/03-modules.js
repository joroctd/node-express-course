const answerFileMap = require('./04-names.js');
const log = require('./05-utils.js');
const vars = require('./06-alternative-flavor.js');

log(
	'04',
	'From array to object to array, file names:',
	...Object.keys(answerFileMap)
);

log('\n06', 'Direct exports:', vars.x, vars.y, vars.z);

log('\n07');
require('./07-mind-grenade.js');
