import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default model('Workout', workoutSchema);
