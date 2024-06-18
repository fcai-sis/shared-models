import mongoose from "mongoose";

export interface IDepartment extends mongoose.Document {
  code: string;
  name: {
    ar: string;
    en: string;
  };
  capacity: number;
  program: ProgramEnumType;
}

export const ProgramEnum = ["GENERAL", "CREDIT"] as const;
export type ProgramEnumType = typeof ProgramEnum[number];

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
  },
  program: {
    type: String,
    required: true,
    enum: ProgramEnum,
    default: ProgramEnum[0],
  },
});

export const departmentModelName = "Department";

export const DepartmentModel =
  mongoose.models.Department ||
  mongoose.model<IDepartment>(departmentModelName, departmentSchema);