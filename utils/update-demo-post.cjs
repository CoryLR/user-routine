
const path = require('path');
const htmlFilePath = path.join(__dirname, '..', 'demo', 'dist', 'index.html?test=quick-regression');
console.log('Updated Demo located at:', 'file://' + htmlFilePath);
