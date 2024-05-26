import mongoose from "mongoose";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import { courseModelName } from "./course.model";
import { teachingAssistantModelName } from "./ta.model";
import { semesterModelName } from "./semester.model";

export interface ITaTeaching extends mongoose.Document {
  taId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  semesterId: mongoose.Schema.Types.ObjectId;
}

const taTeachingSchema = new mongoose.Schema({
  taId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: teachingAssistantModelName,
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
taTeachingSchema.pre("save", async function (next) {
  try {
    const ta = await mongoose
      .model(teachingAssistantModelName)
      .findById(this.taId);
    if (!ta) {
      throw new ForeignKeyNotFound("TA not found");
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
taTeachingSchema.pre("deleteOne", { document: true , query: false }, async function (next) {
  try {
    await mongoose.model("Lecture").deleteMany({ teachingId: this._id });

    next();
  } catch (error: any) {
    return next(error);
  }
});

export const taTeachingModelName = "TaTeaching";

export const TaTeachingModel =
  mongoose.models.TaTeaching ||
  mongoose.model<ITaTeaching>(taTeachingModelName, taTeachingSchema);
