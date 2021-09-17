import { Router } from 'express';
import { Success, Created } from '../core/apiSuccess';
import UserService from '../services/UserService';
import asyncHandler from '../core/asyncHandler';
import { decrypt, encrypt } from '../core/encryption';

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
        const decryptedData = JSON.parse(decrypt(req.body?.data));
        const user = await service.create(decryptedData?.name, decryptedData?.score);
        return Created(user).send(res);
    }),
);

export default router;