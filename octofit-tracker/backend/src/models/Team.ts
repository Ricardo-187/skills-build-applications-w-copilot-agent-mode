import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  captain: string;
  members: number;
  points: number;
  status: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  captain: { type: String, required: true },
  members: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

export default mongoose.model<ITeam>('Team', teamSchema);
