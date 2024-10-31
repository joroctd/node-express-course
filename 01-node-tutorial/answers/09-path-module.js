const path = require('node:path');

const parsedPath = path.parse(__filename);
const expectedPath = path.join(parsedPath.dir, parsedPath.base);
console.log(expectedPath);
