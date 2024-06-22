import mongoose from "mongoose";

import { userModelName } from "./user.model";
import { foreignKey } from "../schema";
import {
  arabicValidator,
  betweenValidator,
  integerValidator,
  numericStringValidator,
} from "../validators";
import { bylawModelName } from "./bylaw.model";

export const studentModelName = "Student";

export const ScientificDivisionEnum = ["SCIENCE", "MATHEMATICS"] as const;
export type ScientificDivision = (typeof ScientificDivisionEnum)[number];

export const GenderEnum = ["MALE", "FEMALE"] as const;
export type GenderEnumType = (typeof GenderEnum)[number];

export const ReligionEnum = ["MUSLIM", "CHRISTIAN", "OTHER"] as const;
export type ReligionEnumType = (typeof ReligionEnum)[number];

export const NationalityEnum = ["EGYPTIAN", "FOREIGNER"] as const;
export type NationalityEnumType = (typeof NationalityEnum)[number];

export interface IStudent extends mongoose.Document {
  studentId: string;
  fullName: string;
  scientificDivision: ScientificDivision;
  gender: GenderEnumType;
  religion: ReligionEnumType;
  nationalId: string;
  administration: string;
  directorate: string;
  phoneNumber: string;
  educationType: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthPlace: string;
  governorateId: number;
  nationality: NationalityEnumType;
  address: string;
  user: mongoose.Schema.Types.ObjectId;
  bylaw: mongoose.Schema.Types.ObjectId;
}

export type StudentType = Omit<IStudent, keyof mongoose.Document>;

const studentSchema = new mongoose.Schema<IStudent>({
  studentId: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    validate: {
      validator: (v: string) => numericStringValidator("Student ID", v),
      message: "Student ID must be a valid ID",
    },
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    validate: {
      validator: (v: string) => arabicValidator("Full Name", v),
      message: "Full name must contain only Arabic letters (أ - ي)",
    },
  },
  scientificDivision: {
    type: String,
    required: [true, "Group code is required"],
    enum: ScientificDivisionEnum,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: GenderEnum,
  },
  religion: {
    type: String,
    required: [true, "Religion is required"],
    enum: ReligionEnum,
  },
  nationalId: {
    type: String,
    required: [true, "National ID is required"],
    validate: {
      validator: (v: string) => numericStringValidator("National ID", v, 14),
      message: "National ID must be a 14-digit number",
    },
  },
  administration: {
    type: String,
    required: [true, "Administration is required"],
    validate: {
      validator: (v: string) => arabicValidator("Administration", v),
    },
  },
  directorate: {
    type: String,
    required: [true, "Directorate is required"],
    validate: {
      validator: (v: string) => arabicValidator("Directorate", v),
      message: "Directorate must contain only letters and Arabic characters",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: (v: string) => numericStringValidator("Phone Number", v, 11),
      message: "Phone number must be an 11-digit number",
    },
  },
  educationType: {
    type: String,
    required: [true, "Education type is required"],
    validate: {
      validator: (v: string) => arabicValidator("Education Type", v),
    },
  },
  birthYear: {
    type: Number,
    required: [true, "Birth year is required"],
    validate: {
      validator: (value: number) => {
        integerValidator("Birth Year", value);
        betweenValidator("Birth Year", value, 1900, new Date().getFullYear());
      },
      message: "Birth year must be a number between 1900 and 2021",
    },
  },
  birthMonth: {
    type: Number,
    required: [true, "Birth month is required"],
    validate: {
      validator: (value: number) => {
        integerValidator("Birth Month", value);
        betweenValidator("Birth Month", value, 1, 12);
      },
      message: "Birth month must be a number between 1 and 12",
    },
  },
  birthDay: {
    type: Number,
    required: [true, "Birth day is required"],
    validate: {
      validator: (value: number) => {
        integerValidator("Birth Day", value);
        betweenValidator("Birth Day", value, 1, 31);
      },
      message: "Birth day must be a number between 1 and 31",
    },
  },
  birthPlace: {
    type: String,
    required: [true, "Birth place is required"],
    validate: {
      validator: (v: string) => arabicValidator("Birth Place", v),
    },
  },
  governorateId: {
    type: Number,
    required: [true, "Governorate ID is required"],
    validate: {
      validator: (v: number) => integerValidator("Governorate ID", v),
      message: "Governorate ID must be a number",
    },
  },
  nationality: {
    type: String,
    required: [true, "Nationality is required"],
    enum: NationalityEnum,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  user: foreignKey(userModelName),
  bylaw: foreignKey(bylawModelName),
});

export const StudentModel =
  mongoose.models.Student ||
  mongoose.model<IStudent>(studentModelName, studentSchema);
