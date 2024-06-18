import mongoose from "mongoose";

export interface IDepartment extends mongoose.Document {
  code: string;
  name: {
    ar: string;
    en: string;
  };
  capacity: number;
}

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
});

export const departmentModelName = "Department";

export const DepartmentModel =
  mongoose.models.Department ||
  mongoose.model<IDepartment>(departmentModelName, departmentSchema);
