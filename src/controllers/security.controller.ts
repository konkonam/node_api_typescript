import * as express from 'express'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import ControllerInterface from '../interfaces/controller.interface'

import User from '../models/user.model'
import RefreshToken from '../models/refreshtoken.model'

/**
 * Responsible for stuff like
 * registration, issuing AccessTokens
 * and refreshing AccessTokens
 */
class SecurityController implements ControllerInterface {
    public path = "/auth"
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(this.path + '/signup', this.signUp)
        this.router.post(this.path + '/signin', this.signIn)
        this.router.post(this.path + '/refresh', this.refresh)
    }

    signUp = (req: Request, res: Response) => {

        const user = new User({
            email: req.query.email,
            username: req.query.username,
            password: req.query.password
        })

        user.save()
            .then(() => {      
                res.json({
                    "message": "registration successfull"
                })
            })
            .catch(error => {
                res.status(500).json({
                    "error": "405",
                    "message": "could not create user!"
                })
            })
    }

    signIn = (req: Request, res: Response) => {
        const email = req.query.email
        const password = req.query.password
        
        const user = User.find({ "email": email });

        if(user.methods.checkPassword(password)) {
            return res.json({
                "error": "403",
                "message": "You are not authorized!"
            })
        }

        const jwtPayload = {
            "username": "admin"
        }

        const jwtToken = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES }); 
        
        return res.json({"token":jwtToken});
    }

    refresh = (req: Request, res: Response) => {
          
    }
}

export default SecurityController