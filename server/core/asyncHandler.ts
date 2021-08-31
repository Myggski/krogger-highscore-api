import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;


/**
 * Handles async methods
 * @param execution
 */
export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
};