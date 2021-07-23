import { Request, Response, NextFunction } from 'express'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip + ':', req.method, req.path)
    next()
}

export default loggerMiddleware