import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { instructorTeachingModelName } from "./instructorTeaching.model";
import { scheduleModelName } from "./schedule.model";
import { foreignKey } from "../schema";

export const lectureModelName = "Lecture";

export interface ILecture extends mongoose.Document {
  schedule: mongoose.Schema.Types.ObjectId;
  hall: mongoose.Schema.Types.ObjectId;
  slot: mongoose.Schema.Types.ObjectId;
  instructorTeaching: mongoose.Schema.Types.ObjectId;
}

export type LectureType = Omit<ILecture, keyof mongoose.Document>;

const lectureSchema = new mongoose.Schema<ILecture>({
  schedule: foreignKey(scheduleModelName),
  hall: foreignKey(hallModelName),
  slot: foreignKey(slotModelName),
  instructorTeaching: foreignKey(instructorTeachingModelName),
});

export const LectureModel =
  mongoose.models.Lecture ||
  mongoose.model<ILecture>(lectureModelName, lectureSchema);
