import mongoose from "mongoose";
import { LocalizedEnum, LocalizedFields } from "../schema";

export const courseModelName = "Course";

/**
 * Validates course codes.
 *
 * A course code must consist of 2-4 uppercase letters followed by 3 digits
 *
 * e.g. CS123, ANN443, CSIS101
 * @param value The course code
 * @returns Whether it is a valid course code or not
 */
export const courseCodeValidator = (value: string) =>
  /^[A-Z]{2,4}\d{3}$/.test(value);

export const CourseTypeEnum = ["MANDATORY", "ELECTIVE", "GRADUATION"] as const;
export type CourseTypeEnumType = (typeof CourseTypeEnum)[number];

export interface ICourse extends mongoose.Document {
  code: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  creditHours: number;
  courseType: CourseTypeEnumType;
}

export type CourseType = Omit<ICourse, keyof mongoose.Document>;

const courseSchema = new mongoose.Schema<ICourse>({
  code: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: courseCodeValidator,
    },
  },
  name: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  description: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  creditHours: {
    type: Number,
    required: true,
  },
  courseType: {
    type: String,
    enum: CourseTypeEnum,
    required: true,
  },
});

export const CourseModel =
  mongoose.models.Course ||
  mongoose.model<ICourse>(courseModelName, courseSchema);

export const courseLocalizedFields: LocalizedFields<CourseType> = {
  name: {
    ar: "اسم المقرر",
    en: "Course Name",
  },
  description: {
    ar: "وصف المقرر",
    en: "Course Description",
  },
  code: {
    ar: "كود المقرر",
    en: "Course Code",
  },
  creditHours: {
    ar: "الساعات المعتمدة",
    en: "Credit Hours",
  },
  courseType: {
    ar: "نوع المقرر",
    en: "Course Type",
  },
};

export const courseTypeLocalizedEnum: LocalizedEnum<CourseTypeEnumType> = {
  MANDATORY: {
    ar: "إلزامي",
    en: "Mandatory",
  },
  ELECTIVE: {
    ar: "اختياري",
    en: "Elective",
  },
  GRADUATION: {
    ar: "تخرج",
    en: "Graduation",
  },
};
