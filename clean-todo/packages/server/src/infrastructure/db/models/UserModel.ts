import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);
