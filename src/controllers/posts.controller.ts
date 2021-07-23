import * as express from 'express'
import { Request, Response } from 'express'
import ControllerInterface from '../interfaces/controller.interface'

class PostsController implements ControllerInterface {
    public path = '/posts'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path + '/:id', this.getPost)
        this.router.get(this.path, this.getAllPosts)
        this.router.post(this.path, this.createPost)
    }

    getPost = (req: Request, res: Response) => {
        const id = +req.params.id
        
        res.status(404).send({
            'error': 'Post not found!'
        })
    }

    getAllPosts = (req: Request, res: Response) => {
        res.status(404).send({
            'error': 'Post not found!'
        })
    }

    createPost = (req: Request, res: Response) => {
        res.status(404).send({
            'error': 'Post not found!'
        })
    }
}

export default PostsController