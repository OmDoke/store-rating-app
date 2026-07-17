import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { verifyToken, authorize } from '../middleware/auth.middleware.js';
import { getOwnerDashboard } from '../controllers/owner.controller.js';

const router = express.Router();
router.use(verifyToken, authorize('store_owner'));

router.get('/dashboard', asyncHandler(getOwnerDashboard));

export default router;
