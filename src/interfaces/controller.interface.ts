import { Router } from 'express'

interface ControllerInterface {
    path: string;
    router: Router;
    initRoutes(): any
}

export default ControllerInterface