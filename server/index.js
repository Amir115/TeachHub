const startServer = require('./config/start-server');
const connectDB = require('./config/mongoose');

connectDB()
.then(startServer)
.then(port => console.log('Express server listening on port ' + port))
.catch(console.log)