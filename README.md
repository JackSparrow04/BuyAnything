# E-commerce Full Repo
Full-stack e-commerce project (Backend: Node/Express/MongoDB, Frontend: React + Vite, Stripe integration).

## Quick start (local)
1. Start MongoDB (or use Atlas) and copy connection string into backend/.env
2. Backend:
   ```
   cd backend
   npm install
   npm run dev
   ```
3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
4. Open frontend at http://localhost:5173

## Structure
- backend/: Express API, models, routes, Stripe PaymentIntent endpoint
- frontend/: React app (Vite), pages, simple admin panel
