import mongoose from "mongoose";
import { foreignKey } from "schema";
import { employeeModelName } from "./employee.model";
import { betweenValidator } from "validators";

export const announcementModelName = "Announcement";

export const AnnouncementSeveritiesEnum = [
  "INFO",
  "WARNING",
  "DANGER",
] as const;
export type AnnouncementSeverityEnumType =
  (typeof AnnouncementSeveritiesEnum)[number];

export interface IAnnouncement {
  author: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  levels?: number[];
  departments?: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  severity: AnnouncementSeverityEnumType;
  archived: boolean;
}

export type AnnouncementType = Omit<IAnnouncement, keyof mongoose.Document>;

const announcementSchema = new mongoose.Schema<IAnnouncement>({
  author: foreignKey(employeeModelName),
  title: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) =>
        betweenValidator("Title length", v.length, 1, 255),
    },
  },
  content: {
    type: String,
    required: true,
  },
  levels: {
    type: [Number],
    required: false,
  },
  departments: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  severity: {
    type: String,
    enum: AnnouncementSeveritiesEnum,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

export const AnnouncementModel =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>(announcementModelName, announcementSchema);
