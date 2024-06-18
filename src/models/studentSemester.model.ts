import mongoose from "mongoose";
import { studentModelName } from "./student.model";
import { semesterModelName } from "./semester.model";

export interface IStudentSemester extends mongoose.Document {
  studentId: mongoose.Schema.Types.ObjectId;
  semesterId: mongoose.Schema.Types.ObjectId;
  semesterDate: Date;
  cumulativeGpa: number;
  semesterLevel: number;
}

const studentSemesterSchema = new mongoose.Schema<IStudentSemester>({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: studentModelName,
    required: true,
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: semesterModelName,
    required: true,
  },
  semesterDate: {
    type: Date,
    required: true,
  },
  cumulativeGpa: {
    type: Number,
    required: true,
  },
  semesterLevel: {
    type: Number,
    required: true,
  },
});

export const studentSemesterModelName = "StudentSemester";

export const StudentSemesterModel =
  mongoose.models.StudentSemester ||
  mongoose.model<IStudentSemester>(
    studentSemesterModelName,
    studentSemesterSchema
  );
