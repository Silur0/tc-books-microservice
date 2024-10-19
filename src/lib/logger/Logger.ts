import { NextFunction, Request, Response } from "express";

export abstract class Logger {
    static log(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    static error(message?: any, ...optionalParams: any[]) {
        console.error(message, ...optionalParams);
    }

    static audit(req: Request, res: Response, next: NextFunction) {
        Logger.log(req.method, req.url, req.query, req.body);
        next();
    }
}
