const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Workout = mongoose.model('Workout', workoutSchema);

async function main() {
  console.log('Connecting to MongoDB:', MONGO_URI);
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  console.log('Clearing existing workouts...');
  await Workout.deleteMany({});

  const now = Date.now();
  const samples = [
    { userId: 'u1', type: 'run', durationMinutes: 30, calories: 320, createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000) },
    { userId: 'u1', type: 'bike', durationMinutes: 45, calories: 540, createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000) },
    { userId: 'u2', type: 'swim', durationMinutes: 60, calories: 700, createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000) },
    { userId: 'u2', type: 'yoga', durationMinutes: 40, calories: 180, createdAt: new Date(now - 4 * 24 * 60 * 60 * 1000) },
    { userId: 'u1', type: 'strength', durationMinutes: 50, calories: 400, createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000) },
    { userId: 'u3', type: 'walk', durationMinutes: 25, calories: 100, createdAt: new Date(now - 6 * 24 * 60 * 60 * 1000) }
  ];

  const inserted = await Workout.insertMany(samples);
  console.log(`Inserted ${inserted.length} workouts.`);

  await mongoose.disconnect();
  console.log('Disconnected.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed error', err);
  process.exit(1);
});
