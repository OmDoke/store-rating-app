import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { User, Store, Rating } from '../models/index.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sequelize } from '../config/db.js';

export const getDashboardStats = async (_req, res) => {
  const [users, stores, ratings] = await Promise.all([User.count(), Store.count(), Rating.count()]);
  return ApiResponse.success(res, 'Dashboard summary', { users, stores, ratings });
};

export const createUser = async (req, res) => {
  const existing = await User.findOne({ where: { email: req.body.email } });
  if (existing) throw new Error('Email already registered');
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  return ApiResponse.success(res, 'User created', { id: user.id, name: user.name, email: user.email, role: user.role }, 201);
};

export const createStore = async (req, res) => {
  const store = await Store.create(req.body);
  return ApiResponse.success(res, 'Store created', store, 201);
};

export const listUsers = async (req, res) => {
  const { name, email, address, role, sortBy = 'createdAt', order = 'DESC' } = req.query;
  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  if (role) where.role = role;
  const users = await User.findAll({ where, order: [[sortBy, order]] });
  return ApiResponse.success(res, 'Users fetched', users);
};

export const listStores = async (req, res) => {
  const { name, email, address, sortBy = 'createdAt', order = 'DESC' } = req.query;
  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  const stores = await Store.findAll({ where, order: [[sortBy, order]] });
  const payload = await Promise.all(stores.map(async (store) => {
    const avg = await Rating.findOne({ where: { storeId: store.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']] });
    return { ...store.toJSON(), avgRating: Number(avg?.dataValues?.avgRating || 0) };
  }));
  return ApiResponse.success(res, 'Stores fetched', payload);
};

export const getUserDetail = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw new Error('User not found');
  const payload = user.toJSON();
  if (user.role === 'store_owner') {
    const store = await Store.findOne({ where: { ownerId: user.id } });
    if (store) {
      const avg = await Rating.findOne({ where: { storeId: store.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']] });
      payload.storeAvgRating = Number(avg?.dataValues?.avgRating || 0);
    }
  }
  return ApiResponse.success(res, 'User details', payload);
};
