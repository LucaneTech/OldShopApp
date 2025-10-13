const http = require('http');

//express app importation
const app = require('./app');
//express app port used
app.set(process.env.PORT || 3000);

//node server creation
const server = http.createServer(app);

//node server port used
server.listen(process.env.PORT || 3000);
