import { body, param } from 'express-validator';

export const ratingValidator = [
  body('storeId').isInt({ min: 1 }).withMessage('Store ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];

export const ratingUpdateValidator = [
  param('id').isInt({ min: 1 }).withMessage('Invalid rating ID'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];
