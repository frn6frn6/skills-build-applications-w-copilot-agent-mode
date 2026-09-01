import { Request, Response } from 'express';
import Workout from '../models/Workout';

export async function getAllWorkouts(_req: Request, res: Response) {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).exec();
    res.json(workouts);
  } catch (err) {
    console.error('getAllWorkouts error', err);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
}

export async function getWorkoutById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).exec();
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error('getWorkoutById error', err);
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
}

export async function createWorkout(req: Request, res: Response) {
  try {
    const { userId, type, durationMinutes, calories } = req.body;
    const workout = new Workout({ userId, type, durationMinutes, calories });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error('createWorkout error', err);
    res.status(400).json({ error: 'Failed to create workout' });
  }
}

export async function updateWorkout(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const workout = await Workout.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error('updateWorkout error', err);
    res.status(400).json({ error: 'Failed to update workout' });
  }
}

export async function deleteWorkout(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id).exec();
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(204).end();
  } catch (err) {
    console.error('deleteWorkout error', err);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
}
