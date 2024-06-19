import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import assert from "assert";
import mongoose from "mongoose";

export const referentialIntegrityValidator = async (
  modelName: string,
  id: mongoose.Schema.Types.ObjectId
) => {
  if (!(await mongoose.model(modelName).findById(id)))
    throw new ForeignKeyNotFound(`${modelName} not found`);
};

export const integerValidator = (field: string, value: number) =>
  assert(
    Number(value) === value && value % 1 === 0,
    `${field} must be an integer`
  );

export const floatValidator = (field: string, value: number) =>
  assert(
    Number(value) === value && value % 1 !== 0,
    `${field} must be a float`
  );

export const betweenValidator = (
  field: string,
  value: number,
  min: number,
  max: number
) =>
  assert(
    value >= min && value <= max,
    `${field} must be between ${min} and ${max}`
  );

export const emailValidator = (field: string, value: string) => {
  assert(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    `${field} must be a valid email`
  );
};

export const arabicValidator = (
  field: string,
  value: string,
  allowWhiteSpace = true
) => {
  if (allowWhiteSpace) {
    assert(
      /^[\p{Script=Arabic}\s]+$/gmu.test(value),
      `${field} must be a valid Arabic text`
    );
  } else {
    assert(
      /^[\p{Script=Arabic}]+$/gmu.test(value),
      `${field} must be a valid single Arabic word`
    );
  }
};

export const numericStringValidator = (
  field: string,
  value: string,
  length?: number
) => {
  if (length) {
    assert(
      /^\d+$/.test(value) && value.length === length,
      `${field} must be a numeric string of length ${length}`
    );
  } else {
    assert(/^\d+$/.test(value), `${field} must be a numeric string`);
  }
};
