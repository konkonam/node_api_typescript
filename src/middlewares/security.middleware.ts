import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

function securityMiddleware(req: Request, res: Response, next: NextFunction) {

    if(!req.path.startsWith('/auth')) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.json({
                "error": "403",
                "message": "Token not prodivded!"
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET as string, (error: any, payload: any) => {
    
            if (error) {
                return res.json({
                    "error": "403",
                    "message": "You are not authorized!"
                })
            }

            console.log(payload.username)
            console.log(payload.role)
        })

    } else {
        console.log('Authentication route indentified!')
    }

    console.log('calling next function...')
    next()
}

export default securityMiddleware