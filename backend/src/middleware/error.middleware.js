import ApiResponse from '../utils/ApiResponse.js';

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  if (err.statusCode) {
    return ApiResponse.error(res, err.message, err.errors, err.statusCode);
  }
  return ApiResponse.error(res, 'Internal server error', [], 500);
};
