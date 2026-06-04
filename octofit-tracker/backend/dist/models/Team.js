import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    members: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    status: { type: String, default: 'Active' },
}, { timestamps: true });
export default mongoose.model('Team', teamSchema);
