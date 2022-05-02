import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';

import createSocketIo from './socket';
import apiRouter from '../routes'

export default () => {
    const app = express()
    const STATIC_FILES_DIR = path.resolve(__dirname, '../client/dist')

    const listenUrl = process.env.LISTEN_URL || '0.0.0.0';
    const port = Number(process.env.PORT) || 8080;

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

    return new Promise<void>(resolve => {
        server.listen(port, listenUrl, undefined, () => {
            console.log(`Server started on port ${port}`)
            resolve();
        })
    })
}