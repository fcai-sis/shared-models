import mongoose from "mongoose";
import { userModelName } from "./user.model";
import { emailValidator } from "../validators";
import { LocalizedFields, foreignKey } from "../schema";

export const employeeModelName = "Employee";

export interface IEmployee extends mongoose.Document {
  fullName: string;
  username: string;
  email: string;
  user: mongoose.Schema.Types.ObjectId;
}

export type EmployeeType = Omit<IEmployee, keyof mongoose.Document>;

const employeeSchema = new mongoose.Schema<IEmployee>({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => emailValidator("Employee Email", v),
    },
  },
  user: foreignKey(userModelName),
});

export const EmployeeModel =
  mongoose.models.Employee ||
  mongoose.model<IEmployee>(employeeModelName, employeeSchema);

export const employeeLocalizedFields: LocalizedFields<
  Omit<EmployeeType, "user">
> = {
  fullName: { ar: "الاسم الكامل", en: "Full Name" },
  username: { ar: "اسم المستخدم", en: "Username" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
};
