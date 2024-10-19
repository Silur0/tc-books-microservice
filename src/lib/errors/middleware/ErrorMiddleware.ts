import { NextFunction, Request, Response } from "express";

import { ApiErrorResponse } from "../../api/ApiErrorResponse";
import { IDomainError } from "../IDomainError";
import { Logger } from "../../logger/Logger";

class ErrorMiddleware {
    handleError = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof IDomainError) {
            res.status(err.httpCode).send(new ApiErrorResponse(err.message));
        } else {
            res.status(500).send(new ApiErrorResponse("Internal Error"));
            Logger.error(err.stack);
        }
    };
}

export default new ErrorMiddleware();
