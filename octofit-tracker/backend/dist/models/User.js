import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    level: { type: String, required: true },
    points: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model('User', userSchema);
