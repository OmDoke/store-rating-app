import express from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { registerValidator } from '../validators/user.validator.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { registerUser, loginUser, logoutUser, updatePassword } from '../controllers/auth.controller.js';

const router = express.Router();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation failed', errors.array().map((e) => e.msg), 400);
  }
  next();
};

router.post('/register', limiter, registerValidator, validate, asyncHandler(registerUser));

router.post('/login', limiter, [body('email').isEmail(), body('password').notEmpty()], validate, asyncHandler(loginUser));

router.post('/logout', verifyToken, asyncHandler(logoutUser));

router.put('/update-password', verifyToken, [body('currentPassword').notEmpty(), body('newPassword').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)], validate, asyncHandler(updatePassword));

export default router;
