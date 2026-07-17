import { Rating } from '../models/index.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createOrUpdateRating = async (req, res) => {
  const existing = await Rating.findOne({ where: { userId: req.user.id, storeId: req.body.storeId } });
  if (existing) {
    existing.rating = req.body.rating;
    await existing.save();
    return ApiResponse.success(res, 'Rating updated', existing);
  }
  const rating = await Rating.create({ userId: req.user.id, storeId: req.body.storeId, rating: req.body.rating });
  return ApiResponse.success(res, 'Rating created', rating, 201);
};

export const updateOwnRating = async (req, res) => {
  const rating = await Rating.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!rating) throw new Error('Rating not found');
  rating.rating = req.body.rating;
  await rating.save();
  return ApiResponse.success(res, 'Rating updated', rating);
};
