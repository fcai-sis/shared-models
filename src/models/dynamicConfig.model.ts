import mongoose from "mongoose";

export const dynamicConfigModelName = "DynamicConfiguration";

export interface IDynamicConfig extends mongoose.Document {
  isCourseEnrollOpen: boolean;
  isGradProjectRegisterOpen: boolean;
  isDepartmentEnrollOpen: boolean;
}

export type DynamicConfigType = Omit<IDynamicConfig, keyof mongoose.Document>;

const dynamicConfigSchema = new mongoose.Schema<IDynamicConfig>({
  isCourseEnrollOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  isGradProjectRegisterOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDepartmentEnrollOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const dynamicConfigModel =
  mongoose.models[dynamicConfigModelName] ||
  mongoose.model<IDynamicConfig>(dynamicConfigModelName, dynamicConfigSchema);
