import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    points: { type: Number, default: 0 },
    notes: { type: String, default: '' },
}, { timestamps: true });
export default mongoose.model('Activity', activitySchema);
