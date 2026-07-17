import { body } from 'express-validator';

const nameRule = body('name').trim().isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters');
const addressRule = body('address').optional({ values: 'falsy' }).isLength({ max: 400 }).withMessage('Address cannot exceed 400 characters');
const emailRule = body('email').isEmail().withMessage('Email must be valid');
const passwordRule = body('password').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/).withMessage('Password must be 8-16 chars with one uppercase and one special character');

export const registerValidator = [nameRule, emailRule, addressRule, passwordRule];
export const createUserValidator = [nameRule, emailRule, addressRule, passwordRule, body('role').optional().isIn(['admin', 'normal', 'store_owner']).withMessage('Invalid role')];
