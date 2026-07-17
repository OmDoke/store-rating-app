import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { verifyToken, authorize } from '../middleware/auth.middleware.js';
import { listStoresForUser } from '../controllers/store.controller.js';

const router = express.Router();

router.use(verifyToken, authorize('normal'));

router.get('/', asyncHandler(listStoresForUser));

export default router;
