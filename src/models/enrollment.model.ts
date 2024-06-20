import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { courseModelName } from "./course.model";
import { studentModelName } from "./student.model";
import { semesterModelName } from "./semester.model";
import { integerValidator } from "../validators";
import { foreignKey } from "../schema";

export const enrollmentModelName = "Enrollment";

export const EnrollmentStatusEnum = ["ENROLLED", "PASSED", "FAILED"] as const;
export type EnrollmentStatusEnumType = (typeof EnrollmentStatusEnum)[number];

export interface IEnrollment extends mongoose.Document {
  student: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  status: EnrollmentStatusEnumType;
  exam: {
    seatNumber?: number;
    hall?: mongoose.Schema.Types.ObjectId;
  };
  grades: {
    finalExam?: number;
    termWork?: number;
  };
}

export type EnrollmentType = Omit<IEnrollment, keyof mongoose.Document>;

// Each row in the enrollment collection represents a student's enrollments throughout the years
export const enrollmentSchema = new mongoose.Schema<IEnrollment>({
  student: foreignKey(studentModelName),
  semester: foreignKey(semesterModelName),
  course: foreignKey(courseModelName),
  status: {
    type: String,
    enum: EnrollmentStatusEnum,
    default: EnrollmentStatusEnum[0],
  },
  exam: {
    seatNumber: {
      type: Number,
      validate: {
        validator: (v: number) => integerValidator("Seat Number", v),
      },
    },
    hall: foreignKey(hallModelName, false),
  },
  grades: {
    finalExam: {
      type: Number,
      validate: {
        validator: (v: number) => integerValidator("Final Exam Grade", v),
      },
    },
    termWork: {
      type: Number,
      validate: {
        validator: (v: number) => integerValidator("Term Work Grade", v),
      },
    },
  },
});

export const EnrollmentModel =
  mongoose.models.Enrollment ||
  mongoose.model<IEnrollment>(enrollmentModelName, enrollmentSchema);
