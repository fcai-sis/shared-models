import mongoose from "mongoose";

export const userModelName = "User";

export interface IUser extends mongoose.Document {
  password: string;
}

export type UserType = Omit<IUser, keyof mongoose.Document>;

const userSchema = new mongoose.Schema<IUser>({
  password: {
    type: String,
    required: true,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model<IUser>(userModelName, userSchema);
