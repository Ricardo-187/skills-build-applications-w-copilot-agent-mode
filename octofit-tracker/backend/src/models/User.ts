import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  team: string;
  level: string;
  points: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: String, required: true },
  level: { type: String, required: true },
  points: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
