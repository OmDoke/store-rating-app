import { Op } from 'sequelize';
import { Store, Rating } from '../models/index.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sequelize } from '../config/db.js';

export const listStoresForUser = async (req, res) => {
  const { search, sortBy = 'createdAt', order = 'DESC' } = req.query;
  const where = search ? { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { address: { [Op.like]: `%${search}%` } }] } : {};
  const stores = await Store.findAll({ where, order: [[sortBy, order]] });
  const payload = await Promise.all(stores.map(async (store) => {
    const [avgResult, userRating] = await Promise.all([
      Rating.findOne({ where: { storeId: store.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']] }),
      Rating.findOne({ where: { userId: req.user.id, storeId: store.id } }),
    ]);
    return {
      ...store.toJSON(),
      avgRating: Number(avgResult?.dataValues?.avgRating || 0),
      myRating: userRating ? userRating.rating : null,
    };
  }));
  return ApiResponse.success(res, 'Stores fetched', payload);
};
