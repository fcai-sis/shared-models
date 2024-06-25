import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { LocalizedFields, foreignKey } from "../schema";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";

export const lectureModelName = "Lecture";

export interface ILecture extends mongoose.Document {
  /**
   * The hall in which the lecture is being taught.
   */
  hall: mongoose.Schema.Types.ObjectId;

  /**
   * The time slot of the lecture.
   */
  slot: mongoose.Schema.Types.ObjectId;

  /**
   * The course being taught in the lecture.
   */
  course: mongoose.Schema.Types.ObjectId;

  /**
   * The semester in which the lecture is being taught.
   */
  semester: mongoose.Schema.Types.ObjectId;
}

export type LectureType = Omit<ILecture, keyof mongoose.Document>;

const lectureSchema = new mongoose.Schema<ILecture>({
  hall: foreignKey(hallModelName),
  slot: foreignKey(slotModelName),
  course: foreignKey(courseModelName),
  semester: foreignKey(semesterModelName),
});

export const LectureModel =
  mongoose.models.Lecture ||
  mongoose.model<ILecture>(lectureModelName, lectureSchema);

export const lectureLocalizedFields: LocalizedFields<
  Omit<LectureType, "semester">
> = {
  course: {
    en: "Course",
    ar: "المقرر",
  },
  hall: {
    en: "Hall",
    ar: "القاعة",
  },
  slot: {
    en: "Slot",
    ar: "الفترة",
  },
};
