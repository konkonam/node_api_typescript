import * as express from 'express'
import * as dotenv from "dotenv";
import { connect } from 'mongoose';
import * as cors from 'cors'

import SecurityController from './controllers/security.controller';

import loggerMiddleware from './middlewares/logger.middleware'
import securityMiddleware from './middlewares/security.middleware'

class App {
    private app: express.Application
    private port: number

    constructor(appInit: { port: number; controllers: any; }) {
        dotenv.config()

        this.app = express()
        this.port = appInit.port

        this.database()
        this.middlewares()
        this.routes(appInit.controllers)
    }

    private database() {
        connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DBNAME, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(res => console.log('Database connection established!'))
        .catch(error => console.log('Error connecting to the database: ' + error));
    }

    private middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use(loggerMiddleware)
        this.app.use(securityMiddleware)
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })        
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App