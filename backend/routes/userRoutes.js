import express from 'express';
import { registerUser, userProfile } from '../controllers/register.js';
import {loginUser} from '../controllers/login.js'
import { users , usersadd, getuserbyid, updateUser } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/profile', userProfile)
router.get('/users', users)
router.post('/usersadd', usersadd)
router.get('/user/:id', getuserbyid)
router.put('/updateuser/:id',updateUser )

export default router;