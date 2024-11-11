const { writeFileSync } = require('node:fs');

for (let i = 0; i < 10000; i++) {
	writeFileSync('./temporary/big.txt', `hello world ${i}\n`, { flag: 'a' });
}
