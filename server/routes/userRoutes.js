import express from 'express';
import { login, getUser, logout } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', isAuthenticated, getUser);
router.post('/logout', isAuthenticated, logout);

export default router;
