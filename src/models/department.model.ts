import mongoose from "mongoose";
import { betweenValidator, integerValidator } from "../validators";

export const departmentModelName = "Department";

export const ProgramEnum = ["GENERAL", "CREDIT"] as const;
export type ProgramEnumType = (typeof ProgramEnum)[number];

export interface IDepartment extends mongoose.Document {
  code: string;
  name: {
    ar: string;
    en: string;
  };
  capacity: number;
  program: ProgramEnumType;
}

export type DepartmentType = Omit<IDepartment, keyof mongoose.Document>;

const departmentSchema = new mongoose.Schema<IDepartment>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  capacity: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => {
        const fieldName = "Department Capacity";
        integerValidator(fieldName, v);
        betweenValidator(fieldName, v, 1, Infinity);
      },
    },
  },
  program: {
    type: String,
    required: true,
    enum: ProgramEnum,
    default: ProgramEnum[0],
  },
});

export const DepartmentModel =
  mongoose.models.Department ||
  mongoose.model<IDepartment>(departmentModelName, departmentSchema);
