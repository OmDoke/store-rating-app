import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { verifyToken, authorize } from '../middleware/auth.middleware.js';
import { ratingValidator, ratingUpdateValidator } from '../validators/rating.validator.js';
import { validationResult } from 'express-validator';
import { createOrUpdateRating, updateOwnRating } from '../controllers/rating.controller.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation failed', errors.array().map((e) => e.msg), 400);
  }
  next();
};

router.use(verifyToken, authorize('normal'));

router.post('/', ratingValidator, validate, asyncHandler(createOrUpdateRating));

router.put('/:id', ratingUpdateValidator, validate, asyncHandler(updateOwnRating));

export default router;
