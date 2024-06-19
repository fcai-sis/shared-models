import mongoose from "mongoose";

import { studentModelName } from "./student.model";
import { semesterModelName } from "./semester.model";
import { foreignKey } from "../schema";
import { floatValidator, integerValidator } from "../validators";

export const studentSemesterModelName = "StudentSemester";

export interface IStudentSemester extends mongoose.Document {
  student: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
  semesterDate: Date;
  cumulativeGpa: number;
  semesterLevel: number;
}

export type StudentSemesterType = Omit<
  IStudentSemester,
  keyof mongoose.Document
>;

const studentSemesterSchema = new mongoose.Schema<IStudentSemester>({
  student: foreignKey(studentModelName),
  semester: foreignKey(semesterModelName),
  semesterDate: {
    type: Date,
    required: true,
  },
  cumulativeGpa: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => floatValidator("Cumulative GPA", v),
    },
  },
  semesterLevel: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => integerValidator("Semester Level", v),
    },
  },
});

export const StudentSemesterModel =
  mongoose.models.StudentSemester ||
  mongoose.model<IStudentSemester>(
    studentSemesterModelName,
    studentSemesterSchema
  );
