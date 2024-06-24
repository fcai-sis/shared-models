import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { foreignKey } from "../schema";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";

export const lectureModelName = "Lecture";

export interface ILecture extends mongoose.Document {
  hall: mongoose.Schema.Types.ObjectId;
  slot: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
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
