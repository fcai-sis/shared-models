import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { courseModelName } from "./course.model";
import { studentModelName } from "./student.model";
import { semesterModelName } from "./semester.model";

export interface IEnrollment extends mongoose.Document {
  studentId: mongoose.Schema.Types.ObjectId;
  semesterId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  status: EnrollmentStatus;
  seatNumber: number | null;
  examHall: mongoose.Schema.Types.ObjectId | null;
}

const EnrollmentStatusEnum = ["enrolled", "passed", "failed"] as const;
export type EnrollmentStatus = typeof EnrollmentStatusEnum[number];

// Each row in the enrollment collection represents a student's enrollments throughout the years
export const enrollmentSchema = new mongoose.Schema({
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
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseModelName,
    required: true,
  },
  status: {
    type: String,
    enum: EnrollmentStatusEnum,
    default: "enrolled",
  },
  seatNumber: {
    type: Number,
    default: null,
  },
  examHall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: hallModelName,
    default: null,
  },
});

export const enrollmentModelName = "Enrollment";

export const EnrollmentModel = mongoose.models.Enrollment || mongoose.model<IEnrollment>(enrollmentModelName, enrollmentSchema);
