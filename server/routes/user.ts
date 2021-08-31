import { Router } from 'express';
import { Success, Created, NoContent } from '../core/apiSuccess';
import UserService from '../services/UserService';
import asyncHandler from '../core/asyncHandler';

const router = Router();
const service = new UserService();

/**
 * Get all users
 */
router.get(
    '/',
    asyncHandler(async (req: any, res: any, next: any) => {
        const users = await service.getList();
        return Success(users).send(res);
    }),
);

/**
 * Create user
 */
router.post(
    '/', 
    asyncHandler( async (req: any, res: any) => {
        const user = await service.create(req.body?.name, req.body?.score);
        return Created(user).send(res);
    }),
);

export default router;