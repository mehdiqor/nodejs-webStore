require('app-module-path').addPath(__dirname);
const Application = require('app/server.js');

new Application(5000, "mongodb://localhost:27017/storeDB");