import mongoose from "mongoose";
import { userModelName } from "./user.model";

export interface IEmployee extends mongoose.Document {
  fullName: string;
  username: string;
  email: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const employeeSchema = new mongoose.Schema<IEmployee>({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModelName,
    required: true,
  },
});

export const employeeModelName = "Employee";

export const EmployeeModel = mongoose.models.Employee || mongoose.model<IEmployee>(employeeModelName, employeeSchema);
