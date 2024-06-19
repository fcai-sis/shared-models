import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { semesterModelName } from "./semester.model";
import { integerValidator } from "../validators";
import { foreignKey } from "../schema";

export const scheduleModelName = "Schedule";

export interface ISchedule extends mongoose.Document {
  description: string;
  level: number;
  department: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
}

const scheduleSchema = new mongoose.Schema<ISchedule>({
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => integerValidator("Level", v),
    },
  },
  department: foreignKey(departmentModelName),
  semester: foreignKey(semesterModelName),
});

export const ScheduleModel =
  mongoose.models.Schedule ||
  mongoose.model<ISchedule>(scheduleModelName, scheduleSchema);
