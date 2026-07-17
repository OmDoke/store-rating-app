import { Store, Rating, User } from '../models/index.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sequelize } from '../config/db.js';

export const getOwnerDashboard = async (req, res) => {
  const store = await Store.findOne({ where: { ownerId: req.user.id } });
  if (!store) return ApiResponse.success(res, 'No store assigned', { averageRating: 0, raters: [] });

  const [avgResult, ratings] = await Promise.all([
    Rating.findOne({ where: { storeId: store.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']] }),
    Rating.findAll({ where: { storeId: store.id }, include: [{ model: User, as: 'user', attributes: ['name', 'email'] }], order: [['createdAt', 'DESC']] }),
  ]);

  const raters = ratings.map((entry) => ({
    name: entry.user?.name,
    email: entry.user?.email,
    rating: entry.rating,
    createdAt: entry.createdAt,
  }));

  return ApiResponse.success(res, 'Owner dashboard', {
    averageRating: Number(avgResult?.dataValues?.avgRating || 0),
    raters,
  });
};
