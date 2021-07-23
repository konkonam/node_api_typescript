import * as express from 'express'
import { Request, Response } from 'express'
import ControllerInterface from '../interfaces/controller.interface'


class HomeController implements ControllerInterface {
    public path = '/'
    public router = express.Router()
    
    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
    }

    index = (req: Request, res: Response) => {
        
        const helloworld = [
            {
                id: 1,
                name: 'Hello World!'
            },
            {
                id: 2,
                name: 'Hello Moon!'
            },
            {
                id: 3,
                name: 'Hello Mars!'
            }
        ]

        res.json({ helloworld })
    }
}

export default HomeController