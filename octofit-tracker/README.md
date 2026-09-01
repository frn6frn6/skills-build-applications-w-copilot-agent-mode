# OctoFit Tracker

This repository contains the OctoFit Tracker skeleton (frontend and backend).

Ports
- Frontend (Vite + React 19): 5173
- Backend (Node + Express): 8000
- MongoDB: 27017

Getting started (local)

1) Frontend

  cd octofit-tracker/frontend
  npm install
  npm run dev

Open http://localhost:5173

2) Backend

  cd octofit-tracker/backend
  npm install
  # Ensure MongoDB is running on localhost:27017
  npm run dev

API
- GET /health -> { status: 'ok' }

Seeding the database

You can populate the MongoDB database with sample workouts for development using the seed script:

  cd octofit-tracker/backend
  # Ensure MongoDB is running on mongodb://localhost:27017 (or set MONGO_URI)
  npm run seed

This will clear the workouts collection and insert a small set of sample documents.

