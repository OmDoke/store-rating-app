import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import storeRoutes from './routes/store.routes.js';
import ratingRoutes from './routes/rating.routes.js';
import ownerRoutes from './routes/owner.routes.js';
import { seedAdmin } from './seed/seedAdmin.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ success: true, message: 'API is healthy' }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/owner', ownerRoutes);

app.use(errorHandler);

await connectDb();
await sequelize.sync({ alter: true });
await seedAdmin();

export default app;
