import mongoose from "mongoose";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import { departmentModelName } from "./department.model";
import { semesterModelName } from "./semester.model";

export interface ISchedule extends mongoose.Document {
  description: string;
  level: number;
  departmentId: mongoose.Schema.Types.ObjectId;
  semesterId: mongoose.Schema.Types.ObjectId;
}

const scheduleSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: departmentModelName,
    required: true,
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: semesterModelName,
    required: true,
  },
});

// Pre-save hook to ensure referential integrity
scheduleSchema.pre("save", async function (next) {
  try {
    const department = await mongoose
      .model(departmentModelName)
      .findById(this.departmentId);
    if (!department) {
      throw new ForeignKeyNotFound("Department not found");
    }

    const semester = await mongoose
      .model(semesterModelName)
      .findById(this.semesterId);
    if (!semester) {
      throw new ForeignKeyNotFound("Semester not found");
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export const scheduleModelName = "Schedule";

export const ScheduleModel =
  mongoose.models.Schedule ||
  mongoose.model<ISchedule>(scheduleModelName, scheduleSchema);
