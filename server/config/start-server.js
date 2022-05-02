module.exports = () => {
    const path = require('path');
    const {config} = require('dotenv')
    config()

    const http = require('http');
    const express = require('express');
    const createSocketIo = require('../socket')

    const bodyParser = require('body-parser');
    const apiRouter = require('../routes');

    const errorHandler = require('errorhandler');

    const app = express()
    const STATIC_FILES_DIR = path.resolve(__dirname, '../client/dist')

    app.set('port', process.env.PORT || 8080)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static(STATIC_FILES_DIR))

    app.use('/api', apiRouter)

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(STATIC_FILES_DIR, 'index.html'));
    });

// error handling middleware should be loaded after the loading the routes
    if (app.get('env') === 'development') {
        app.use(errorHandler())
    }

    const server = http.createServer(app);
    createSocketIo(server);

    return new Promise(resolve => {
        server.listen(app.get('port'), '0.0.0.0', () => resolve(app.get('port')))
    })
}