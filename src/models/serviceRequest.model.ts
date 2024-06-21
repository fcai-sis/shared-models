import mongoose from "mongoose";
import { foreignKey } from "../schema";
import { studentModelName } from "./student.model";

const serviceRequestModelName = "ServiceRequest";

export const ServiceRequestStatusEnum = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
] as const;
export type ServiceRequestStatusEnumType =
  (typeof ServiceRequestStatusEnum)[number];

export interface IServiceRequest extends mongoose.Document {
  serviceName: string;
  status: ServiceRequestStatusEnumType;
  student: mongoose.Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
  claimAt: Date;
  image: string;
}

export type ServiceRequestType = Omit<IServiceRequest, keyof mongoose.Document>;

const serviceRequestSchema = new mongoose.Schema<IServiceRequest>({
  serviceName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ServiceRequestStatusEnum,
    required: true,
    default: ServiceRequestStatusEnum[0],
  },
  student: foreignKey(studentModelName),
  message: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  claimAt: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    required: true,
    default: null,
  },
});

export const ServiceRequestModel =
  mongoose.models.ServiceRequest ||
  mongoose.model<IServiceRequest>(
    serviceRequestModelName,
    serviceRequestSchema
  );
