import mongoose from "mongoose";
import { studentModelName } from "./student.model";
import { departmentModelName } from "./department.model";

export interface IAcademicStudent extends mongoose.Document {
  student: mongoose.Schema.Types.ObjectId;
  currentGpa: number;
  currentLevel: number;
  completedTotalCreditHours: number;
  currentDepartment: mongoose.Schema.Types.ObjectId;
}

const academicStudentSchema = new mongoose.Schema<IAcademicStudent>({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: studentModelName,
    required: true,
  },

  currentGpa: {
    type: Number,
    default: 4.0,
  },

  currentLevel: {
    type: Number,
    default: 1,
  },

  completedTotalCreditHours: {
    type: Number,
    default: 0,
  },

  currentDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: departmentModelName,
  },
});

export const academicStudentModelName = "Academic Student";

export const AcademicStudentModel =
  mongoose.models.AcademicStudent ||
  mongoose.model<IAcademicStudent>(
    academicStudentModelName,
    academicStudentSchema
  );
