import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { verifyToken, authorize } from '../middleware/auth.middleware.js';
import { createUserValidator } from '../validators/user.validator.js';
import { body, validationResult } from 'express-validator';
import { getDashboardStats, createUser, createStore, listUsers, listStores, getUserDetail } from '../controllers/admin.controller.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation failed', errors.array().map((e) => e.msg), 400);
  }
  next();
};

router.use(verifyToken, authorize('admin'));

router.get('/dashboard', asyncHandler(getDashboardStats));

router.post('/users', createUserValidator, validate, asyncHandler(createUser));

router.post('/stores', [body('name').notEmpty(), body('email').isEmail(), body('address').optional().isLength({ max: 400 })], validate, asyncHandler(createStore));

router.get('/users', asyncHandler(listUsers));

router.get('/stores', asyncHandler(listStores));

router.get('/users/:id', asyncHandler(getUserDetail));

export default router;
