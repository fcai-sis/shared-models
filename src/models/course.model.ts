import mongoose, { InferSchemaType } from "mongoose";
import { departmentModelName } from "./department.model";

const courseModelName = "Course";

enum CourseTypeEnum {
  Mandatory = "mandatory",
  Elective = "elective",
  Graduation = "graduation",
}

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
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
  prerequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: courseModelName,
    },
  ],
  departments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: departmentModelName,
    required: true,
  },
  creditHours: {
    type: Number,
    required: true,
  },
  courseType: {
    type: String,
    enum: Object.values(CourseTypeEnum),
    required: true,
  },
});


type CourseType = InferSchemaType<typeof courseSchema>;

const CourseModel = mongoose.model<CourseType>(courseModelName, courseSchema);

export { CourseModel, CourseType, courseModelName, CourseTypeEnum};
