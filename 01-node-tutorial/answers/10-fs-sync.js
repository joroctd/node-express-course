const { writeFileSync, readFileSync } = require('node:fs');

const filePath = './temporary/fileA.txt';
writeFileSync(filePath, 'Line 1\n', { flag: 'w' });
writeFileSync(filePath, 'Line 2\n', { flag: 'a' });
writeFileSync(filePath, 'Line 3\n', { flag: 'a' });

const fileContents = readFileSync(filePath).toString();
console.log(fileContents);
