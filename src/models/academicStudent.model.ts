import mongoose from "mongoose";
import { studentModelName } from "./student.model";
import { departmentModelName } from "./department.model";
import { betweenValidator, integerValidator } from "../validators";
import { LocalizedFields, foreignKey } from "../schema";

export const academicStudentModelName = "AcademicStudent";

export interface IAcademicStudent extends mongoose.Document {
  student: mongoose.Schema.Types.ObjectId;
  major: mongoose.Schema.Types.ObjectId;
  gpa: number;
  level: number;
  mandatoryHours: number;
  electiveHours: number;
  isGraduated: boolean;
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
    required: true,
  },
  level: {
    type: Number,
    default: 1,
    validate: {
      validator: (v: number) => integerValidator("Current Level", v),
    },
  },
  mandatoryHours: {
    type: Number,
    default: 0,
    validate: {
      validator: (v: number) => {
        integerValidator("Mandatory Credit Hours", v);
        betweenValidator("Mandatory Credit Hours", v, 0, Infinity);
      },
    },
  },
  electiveHours: {
    type: Number,
    default: 0,
    validate: {
      validator: (v: number) => {
        integerValidator("Elective Credit Hours", v);
        betweenValidator("Elective Credit Hours", v, 0, Infinity);
      },
    },
  },
  isGraduated: {
    type: Boolean,
    default: false,
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
    mandatoryHours: { ar: "ساعات الإجباري", en: "Mandatory Hours" },
    electiveHours: { ar: "ساعات الاختياري", en: "Elective Hours" },
    isGraduated: { ar: "هل تخرج", en: "Is Graduated" },
  };
