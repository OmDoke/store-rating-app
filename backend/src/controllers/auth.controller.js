import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const registerUser = async (req, res) => {
  const existing = await User.findOne({ where: { email: req.body.email } });
  if (existing) throw new ApiError(409, 'Email already registered');

  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: hashed,
    role: 'normal',
  });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
  return ApiResponse.success(res, 'Registered successfully', { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, 201);
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
  return ApiResponse.success(res, 'Logged in successfully', { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const logoutUser = (_req, res) => ApiResponse.success(res, 'Logged out successfully');

export const updatePassword = async (req, res) => {
  const user = req.user;
  const valid = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!valid) throw new ApiError(401, 'Current password is incorrect');

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  await user.save();
  return ApiResponse.success(res, 'Password updated successfully');
};
