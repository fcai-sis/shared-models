import mongoose from "mongoose";
import { studentModelName } from "./student.model";
import { departmentModelName } from "./department.model";
import {
  betweenValidator,
  floatValidator,
  integerValidator,
} from "../validators";
import { LocalizedFields, foreignKey } from "../schema";

export const academicStudentModelName = "AcademicStudent";

export interface IAcademicStudent extends mongoose.Document {
  student: mongoose.Schema.Types.ObjectId;
  major: mongoose.Schema.Types.ObjectId;
  gpa: number;
  level: number;
  creditHours: number;
}

export type AcademicStudentType = Omit<
  IAcademicStudent,
  keyof mongoose.Document
>;

const academicStudentSchema = new mongoose.Schema<IAcademicStudent>({
  student: foreignKey(studentModelName),
  major: foreignKey(departmentModelName, false),
  gpa: {
    type: Number,
    default: 4.0,
  },
  level: {
    type: Number,
    default: 1,
    validate: {
      validator: (v: number) => integerValidator("Current Level", v),
    },
  },
  creditHours: {
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

export const academicStudentLocalizedFields: LocalizedFields<AcademicStudentType> =
  {
    student: { ar: "الطالب", en: "Student" },
    major: { ar: "التخصص", en: "Major" },
    gpa: { ar: "المعدل التراكمي", en: "GPA" },
    level: { ar: "المستوى الحالي", en: "Current Level" },
    creditHours: { ar: "الساعات المعتمدة", en: "Credit Hours" },
  };
