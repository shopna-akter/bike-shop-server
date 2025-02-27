import { Router } from 'express';
import { adminControllers } from './admin.controllers';
import authorizeUser from '../../middlewares/authorizeUser';
import { USER_ROLES } from '../user/user.constants';

const router = Router();

router.patch(
	'/users/:id/block',
	authorizeUser(USER_ROLES.ADMIN),
	adminControllers.deactivateUser,
);
router.get('/users', authorizeUser(USER_ROLES.ADMIN), adminControllers.getAllUsers);
export const adminRoutes = router;
