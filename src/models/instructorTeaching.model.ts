import mongoose from "mongoose";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import { instructorModelName } from "./instructor.model";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";
import { LectureModel } from "./lecture.model";

export interface IInstructorTeaching extends mongoose.Document {
  instructorId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  semesterId: mongoose.Schema.Types.ObjectId;
}

const instructorTeachingSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: instructorModelName,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseModelName,
    required: true,
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: semesterModelName,
    required: true,
  },
});

// Pre-save hook to ensure referential integrity
instructorTeachingSchema.pre("save", async function (next) {
  try {
    const instructor = await mongoose
      .model(instructorModelName)
      .findById(this.instructorId);
    if (!instructor) {
      throw new ForeignKeyNotFound("Instructor not found");
    }

    const course = await mongoose
      .model(courseModelName)
      .findById(this.courseId);
    if (!course) {
      throw new ForeignKeyNotFound("Course not found");
    }

    const semester = await mongoose
      .model(semesterModelName)
      .findById(this.semesterId);
    if (!semester) {
      throw new ForeignKeyNotFound("Semester not found");
    }

    next();
  } catch (error: any) {
    return next(error);
  }
});

//pre hook to ensure referential integrity is maintained so it delete lectures on deleting instructor teaching
instructorTeachingSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await LectureModel.deleteMany({ teachingId: this._id });

      next();
    } catch (error: any) {
      return next(error);
    }
  }
);

export const instructorTeachingModelName = "InstructorTeaching";

export const InstructorTeachingModel =
  mongoose.models.InstructorTeaching ||
  mongoose.model<IInstructorTeaching>(
    instructorTeachingModelName,
    instructorTeachingSchema
  );
