import mongoose, { InferSchemaType, Schema } from "mongoose";

import { hallModelName } from "./hall.model";
import { courseModelName } from "./course.model";
import { studentModelName } from "./student.model";
import { semesterModelName } from "./semester.model";

const EnrollmentStatusEnum = ["enrolled", "passed", "failed"] as const;
export type EnrollmentStatus = typeof EnrollmentStatusEnum[number];

// Each row in the enrollment collection represents a student's enrollments throughout the years
export const enrollmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: studentModelName,
    required: true,
  },
  semesterId: {
    type: Schema.Types.ObjectId,
    ref: semesterModelName,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: hallModelName,
    default: null,
  },
});

export type EnrollmentType = InferSchemaType<typeof enrollmentSchema>;

export const enrollmentModelName = "Enrollment";

export const EnrollmentModel = mongoose.model<EnrollmentType>(
  enrollmentModelName,
  enrollmentSchema
);

