import { NextFunction, Request, Response } from "express";

import { ApiErrorResponse } from "../../api/ApiErrorResponse";
import { IDomainError } from "../IDomainError";

class ErrorMiddleware {
    handleError = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof IDomainError) {
            res.status(err.statusCode).send(new ApiErrorResponse(err.message));
        } else {
            res.status(500).send(new ApiErrorResponse("Internal Error"));
            console.error(err.stack);
        }
    };
}

export default new ErrorMiddleware();
