# Store Rating Platform

A full-stack store rating application with role-based access for admins, normal users, and store owners.

## Features
- JWT authentication with role-based routing
- Admin dashboard and management screens
- Normal user store browsing and ratings
- Store owner dashboard with rating insights
- Backend validation and seeded admin user

## Backend setup
1. Create a MySQL database named `store_rating_app`.
2. Copy `backend/.env.example` to `backend/.env` and update the database and JWT values.
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Start the API:
   ```bash
   npm start
   ```
5. Seed the default admin account:
   ```bash
   npm run seed
   ```

## Frontend setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the Vite URL shown in the terminal.

## Default admin login
- Email: `admin@example.com`
- Password: `Admin@123`
