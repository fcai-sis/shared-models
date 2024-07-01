import mongoose, { Model } from "mongoose";
import { referentialIntegrityValidator } from "./validators";

/**
 * A function to create a foreign key schema for a model.
 *
 * @param modelName The name of the model to reference
 * @param required Whether the field is required or not
 * @returns A foreign key schema to be destructured in the schema of the model using it
 */
export const foreignKey = (modelName: string, required: boolean = true) => ({
  type: mongoose.Schema.Types.ObjectId,
  ref: modelName,
  validate: {
    validator: async (v: mongoose.Schema.Types.ObjectId) =>
      await referentialIntegrityValidator(modelName, v),
  },
  required,
});

/**
 * A function to cascade delete foreign keys.
 *
 * @param modelName The name of the model to reference
 * @param fieldName The name of the field containing the foreign key
 * @param value The value of the foreign key to delete
 */
export const cascadeDelete = async (
  modelName: string,
  fieldName: string,
  value: mongoose.Schema.Types.ObjectId
) => {
  const Model = mongoose.model(modelName) as Model<Document>;
  await Model.updateMany(
    { [fieldName]: value },
    { $pull: { [fieldName]: value } }
  ).exec();
};

export type LocalizedFields<T> = {
  [key in keyof T]: { ar: string; en: string };
};

export type LocalizedEnum<T extends string | number | symbol> = {
  [key in keyof { [key in T]: never }]: { ar: string; en: string };
};
