import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { courseModelName } from "./course.model";
import { studentModelName } from "./student.model";
import { semesterModelName } from "./semester.model";
import { integerValidator } from "../validators";
import { LocalizedEnum, LocalizedFields, foreignKey } from "../schema";

export const enrollmentModelName = "Enrollment";

export const EnrollmentStatusEnum = ["ENROLLED", "PASSED", "FAILED"] as const;
export type EnrollmentStatusEnumType = (typeof EnrollmentStatusEnum)[number];

export interface IEnrollment extends mongoose.Document {
  /**
   * The student who is enrolled in the course
   */
  student: mongoose.Schema.Types.ObjectId;

  /**
   * The semester in which the student is enrolled in the course
   */
  semester: mongoose.Schema.Types.ObjectId;

  /**
   * The course the student is enrolled in
   */
  course: mongoose.Schema.Types.ObjectId;

  /**
   * The status of the enrollment
   */
  status: EnrollmentStatusEnumType;

  /**
   * The section/lab group, if the course has sections/labs
   */
  group?: Number;

  /**
   * The seat number for the exam, starts as null until the exam is scheduled
   */
  examSeatNumber?: number;

  /**
   * The hall where the exam will be conducted, starts as null until the exam is scheduled
   */
  examHall?: mongoose.Schema.Types.ObjectId;

  /**
   * The student's mark in the final exam, starts as null until the exam is conducted and graded
   */
  finalExamMark?: number;

  /**
   * The student's mark in the term work, starts as null until the term work is graded
   */
  termWorkMark?: number;

  /**
   * The final mark for the enrollment, calculated based on the final exam and term work marks and the student's bylaw
   */
  grade?: string;
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
  group: {
    type: String,
    required: false,
  },
  examSeatNumber: {
    type: Number,
    validate: {
      validator: (v: number) => integerValidator("Seat Number", v),
    },
  },

  examHall: foreignKey(hallModelName, false),
  finalExamMark: {
    type: Number,
    validate: {
      validator: (v: number) => integerValidator("Final Exam Grade", v),
    },
  },
  termWorkMark: {
    type: Number,
    validate: {
      validator: (v: number) => integerValidator("Term Work Grade", v),
    },
  },
  grade: {
    type: String,
    default: null,
  },
});

export const EnrollmentModel =
  mongoose.models.Enrollment ||
  mongoose.model<IEnrollment>(enrollmentModelName, enrollmentSchema);

export const enrollmentLocalizedFields: LocalizedFields<EnrollmentType> = {
  student: {
    ar: "الطالب",
    en: "Student",
  },
  semester: {
    ar: "الفصل",
    en: "Semester",
  },
  course: {
    ar: "المادة",
    en: "Course",
  },
  status: {
    ar: "الحالة",
    en: "Status",
  },
  group: {
    ar: "المجموعة",
    en: "Group",
  },
  examSeatNumber: {
    ar: "رقم المقعد",
    en: "Exam Seat Number",
  },
  examHall: {
    ar: "قاعة الامتحان",
    en: "Exam Hall",
  },
  finalExamMark: {
    ar: "درجة الامتحان النهائي",
    en: "Final Exam Mark",
  },
  termWorkMark: {
    ar: "درجة العمل الفصلي",
    en: "Term Work Mark",
  },
  grade: {
    ar: "الدرجة",
    en: "Grade",
  },
};

export const enrollmentStatusLocalizedEnum: LocalizedEnum<EnrollmentStatusEnumType> =
  {
    ENROLLED: {
      ar: "مسجل",
      en: "Enrolled",
    },
    PASSED: {
      ar: "ناجح",
      en: "Passed",
    },
    FAILED: {
      ar: "راسب",
      en: "Failed",
    },
  };
