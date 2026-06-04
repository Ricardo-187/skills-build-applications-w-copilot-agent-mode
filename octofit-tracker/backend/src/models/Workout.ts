import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
  focus: { type: String, default: 'General fitness' },
}, { timestamps: true });

export default mongoose.model<IWorkout>('Workout', workoutSchema);
