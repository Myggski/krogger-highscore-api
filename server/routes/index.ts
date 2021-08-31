import { Router } from 'express';
import user from './user';

const router = Router();

/*-------------------------------*/
// Routes
/*-------------------------------*/
router.use('/user', user);

export default router;