import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

export const seedAdmin = async () => {
  const existing = await User.findOne({ where: { email: 'admin@example.com' } });
  if (!existing) {
    await User.create({
      name: 'Administrator User',
      email: 'admin@example.com',
      password: await bcrypt.hash('Admin@123', 10),
      address: 'Admin HQ',
      role: 'admin',
    });
    console.log('Seeded admin user.');
  }
};
