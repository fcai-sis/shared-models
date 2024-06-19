import mongoose from "mongoose";
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
