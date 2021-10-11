const http = require('http');
const app = require('./app'); // app file include
const globalVariable = require("./nodemonconfig.js");
const port  = globalVariable.port;
console.log('port ',port);

const server = http.createServer(app);
server.listen(port);