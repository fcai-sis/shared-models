import mongoose from "mongoose";
import { studentModelName } from "./student.model";
import { departmentModelName } from "./department.model";
import {
  betweenValidator,
  floatValidator,
  integerValidator,
} from "../validators";
import { foreignKey } from "../schema";

export const academicStudentModelName = "AcademicStudent";

export interface IAcademicStudent extends mongoose.Document {
  student: mongoose.Schema.Types.ObjectId;
  currentDepartment: mongoose.Schema.Types.ObjectId;
  currentGpa: number;
  currentLevel: number;
  completedCreditHours: number;
}

export type AcademicStudentType = Omit<
  IAcademicStudent,
  keyof mongoose.Document
>;

const academicStudentSchema = new mongoose.Schema<IAcademicStudent>({
  student: foreignKey(studentModelName),
  currentDepartment: foreignKey(departmentModelName, false),
  currentGpa: {
    type: Number,
    default: 4.0,
  },
  currentLevel: {
    type: Number,
    default: 1,
    validate: {
      validator: (v: number) => integerValidator("Current Level", v),
    },
  },
  completedCreditHours: {
    type: Number,
    default: 0,
    validate: {
      validator: (v: number) => {
        integerValidator("Credit Hours", v);
        betweenValidator("Credit Hours", v, 0, Infinity);
      },
    },
  },
});

export const AcademicStudentModel =
  mongoose.models.AcademicStudent ||
  mongoose.model<IAcademicStudent>(
    academicStudentModelName,
    academicStudentSchema
  );
