const { createReadStream } = require('node:fs');

const chunkThreshold = 200;
const bigStream = createReadStream('./temporary/big.txt', {
	encoding: 'utf8',
	highWaterMark: chunkThreshold
});

let counter = 0;
bigStream.on('data', chunk => {
	counter++;
	console.log(chunk);
});
bigStream.on('end', () =>
	console.log(
		`The file contained ${counter} chunks, with a threshold of ${chunkThreshold} bytes per chunk.`
	)
);
