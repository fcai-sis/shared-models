import mongoose from "mongoose";
import { userModelName } from "./user.model";
import { emailValidtor } from "../validators";
import { foreignKey } from "../schema";

export const employeeModelName = "Employee";

export interface IEmployee extends mongoose.Document {
  fullName: string;
  username: string;
  email: string;
  user: mongoose.Schema.Types.ObjectId;
}

const employeeSchema = new mongoose.Schema<IEmployee>({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => emailValidtor("Employee Email", v),
    },
  },
  user: foreignKey(userModelName),
});

export const EmployeeModel =
  mongoose.models.Employee ||
  mongoose.model<IEmployee>(employeeModelName, employeeSchema);
