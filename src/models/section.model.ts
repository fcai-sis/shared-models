import mongoose from "mongoose";

import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { scheduleModelName } from "./schedule.model";
import { taTeachingModelName } from "./taTeaching.model";

export interface ISection extends mongoose.Document {
  groupName: string;
  scheduleId: mongoose.Schema.Types.ObjectId;
  hallId: mongoose.Schema.Types.ObjectId;
  slotId: mongoose.Schema.Types.ObjectId;
  teachingId: mongoose.Schema.Types.ObjectId;
}

const sectionSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
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
    ref: taTeachingModelName,
    required: true,
  },
});

// Pre-save hook to ensure referential integrity
sectionSchema.pre("save", async function (next) {
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
      .model(taTeachingModelName)
      .findById(this.teachingId);
    if (!teaching) {
      throw new ForeignKeyNotFound("Teaching not found");
    }
  } catch (error: any) {
    return next(error);
  }

  next();
});

export const sectionModelName = "Section";

export const SectionModel =
  mongoose.models.Section ||
  mongoose.model<ISection>(sectionModelName, sectionSchema);
