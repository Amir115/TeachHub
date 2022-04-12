const path = require('path');
const {config} = require('dotenv')
config()

const http = require('http');
const express = require('express');
const createSocketIo = require('./socket')

const bodyParser = require('body-parser');
const apiRouter = require('./routes');

const errorHandler = require('errorhandler');

const app = express()
const server = http.createServer(app);

const io = createSocketIo(server);

app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist')))

app.use('/api', apiRouter)

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
    app.use(errorHandler())
}

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'))
})