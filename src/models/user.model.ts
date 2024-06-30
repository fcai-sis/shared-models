import mongoose from "mongoose";

export const userModelName = "User";

export const RoleEnum = [
  "ADMIN",
  "STUDENT",
  "EMPLOYEE",
  "INSTRUCTOR",
  "TEACHING_ASSISTANT",
] as const;
export type RoleEnumType = (typeof RoleEnum)[number];

export interface IUser extends mongoose.Document {
  role: RoleEnumType;
  password: string;
}

export type UserType = Omit<IUser, keyof mongoose.Document>;

const userSchema = new mongoose.Schema<IUser>({
  role: {
    type: String,
    required: true,
    enum: RoleEnum,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model<IUser>(userModelName, userSchema);
