import mongoose from "mongoose";

import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { instructorTeachingModelName } from "./instructorTeaching.model";
import { scheduleModelName } from "./schedule.model";

export interface ILecture extends mongoose.Document {
  scheduleId: mongoose.Schema.Types.ObjectId;
  hallId: mongoose.Schema.Types.ObjectId;
  slotId: mongoose.Schema.Types.ObjectId;
  teachingId: mongoose.Schema.Types.ObjectId;
}

const lectureSchema = new mongoose.Schema({
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: scheduleModelName,
    required: true,
  },
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: hallModelName,
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: slotModelName,
    required: true,
  },
  teachingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: instructorTeachingModelName,
    required: true,
  },
});

// Pre-save hook to ensure referential integrity
lectureSchema.pre("save", async function (next) {
  try {
    const schedule = await mongoose
      .model(scheduleModelName)
      .findById(this.scheduleId);
    if (!schedule) {
      throw new ForeignKeyNotFound("Schedule not found");
    }

    const hall = await mongoose.model(hallModelName).findById(this.hallId);
    if (!hall) {
      throw new ForeignKeyNotFound("Hall not found");
    }

    const slot = await mongoose.model(slotModelName).findById(this.slotId);
    if (!slot) {
      throw new ForeignKeyNotFound("Slot not found");
    }

    const teaching = await mongoose
      .model(instructorTeachingModelName)
      .findById(this.teachingId);
    if (!teaching) {
      throw new ForeignKeyNotFound("Teaching not found");
    }
  } catch (error: any) {
    return next(error);
  }

  next();
});

export const lectureModelName = "Lecture";

export const LectureModel =
  mongoose.models.Lecture ||
  mongoose.model<ILecture>(lectureModelName, lectureSchema);
