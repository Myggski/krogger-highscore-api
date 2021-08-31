import path from 'path';
import { environment } from '../config';
import { Response, Request, NextFunction } from 'express';
import { ApiError, InternalError, NotFoundError } from '../core/apiError';


export const handleIndex = (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '../../app/dist/index.html'));
}
/**
 * If it's a custom made error, handle the error with care.
 * Otherwise we don't give a rats ass, don't spill the beans of what have happend to the client.
 * @param err - ApiError or Error
 * @param req - The Request
 * @param res - The Response
 * @param next - NextFunction
 */
export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return ApiError.handle(err, res);
    }

    if (environment === 'development') {
        return res.status(500).send(err.message);
    }

    return ApiError.handle(new InternalError(), res);
};

/**
 * Page could not be found, pass it to the error handler with response status 404
 * @param req - The Request
 * @param res - The Response
 * @param next - NextFunction
 */
export const handlePageNotFound = (req: Request, res: Response, next: NextFunction) => next(new NotFoundError());