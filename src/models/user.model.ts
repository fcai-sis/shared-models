import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  password: {
    type: String,
    required: true,
  },
});

export const userModelName = 'User';

export default mongoose.models.User || mongoose.model<IUser>(userModelName, userSchema);
