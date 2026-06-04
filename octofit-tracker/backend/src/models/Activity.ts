import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  duration: number;
  points: number;
  notes: string;
}

const activitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  points: { type: Number, default: 0 },
  notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model<IActivity>('Activity', activitySchema);
