import express from 'express';
import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController';

const router = express.Router();

// GET /api/workouts
router.get('/', getAllWorkouts);

// GET /api/workouts/:id
router.get('/:id', getWorkoutById);

// POST /api/workouts
router.post('/', createWorkout);

// PUT /api/workouts/:id
router.put('/:id', updateWorkout);

// DELETE /api/workouts/:id
router.delete('/:id', deleteWorkout);

export default router;
