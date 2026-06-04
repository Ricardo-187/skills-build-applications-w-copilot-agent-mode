import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, default: 'General fitness' },
}, { timestamps: true });
export default mongoose.model('Workout', workoutSchema);
