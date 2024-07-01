import mongoose from "mongoose";
import { DepartmentModel } from "./department.model";

// Define the sub-schema for level requirements
// Interface for grade schema
export interface IGrade {
  weight: number;
  percentage: {
    min: number;
    max: number;
  };
}

// Interface for level requirement schema
export interface ILevelRequirement {
  mandatoryHours: number;
  electiveHours: number;
  totalHours: number;
  maxYears: number;
}

// Interface for graduation project requirement schema
export interface IGraduationProjectRequirement {
  mandatoryHours: number;
  electiveHours: number;
  totalHours: number;
}

// Interface for bylaw schema
export interface IByLaw extends mongoose.Document {
  name: string;
  gradeWeights: Map<string, IGrade>;
  gpaScale: number;
  useDetailedHours: boolean;
  useDetailedGraduationProjectHours: boolean;
  levelRequirements: Map<string, ILevelRequirement>;
  graduationProjectRequirements: Map<string, IGraduationProjectRequirement>;
  graduateRequirement: number;
  coursePassCriteria: number;
  yearApplied: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ByLawType = Omit<IByLaw, keyof mongoose.Document>;

const gradeWeightValidator = function (this: any, val: number) {
  const parent = this.parent();
  const gpaScale = parent.gpaScale;
  return val >= 0 && val <= gpaScale;
};

const gradeValidationFunction = async (gradeWeights: Map<string, any>) => {
  const ranges = [];

  for (let [_, value] of gradeWeights) {
    ranges.push({ min: value.percentage.min, max: value.percentage.max });
  }

  // Sort ranges by min value
  ranges.sort((a, b) => a.min - b.min);

  // Check for overlaps
  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min <= ranges[i - 1].max) {
      return false; // Overlap found
    }
  }

  // Ensure the entire range from 0 to 100 is covered
  if (ranges[0].min !== 0 || ranges[ranges.length - 1].max !== 100) {
    return false; // Coverage gap found
  }

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min !== ranges[i - 1].max + 1) {
      return false; // Gap found
    }
  }

  return true;
};

const departmentCodeValidator = async (map: Map<string, any>) => {
  const departmentCodes = Array.from(map.keys());
  const departments = await DepartmentModel.find({
    code: { $in: departmentCodes },
  });
  const validCodes = departments.map((department) => department.code);
  return departmentCodes.every((code) => validCodes.includes(code));
};

const numericKeyValidator = (map: Map<string, any>) => {
  const keys = Array.from(map.keys());
  return keys.every((key) => !isNaN(parseInt(key)));
};

const gradeSchema = new mongoose.Schema<IGrade>(
  {
    weight: {
      type: Number,
      validate: [
        gradeWeightValidator,
        "Grade weights must be between 0 and the GPA scale",
      ],
      required: true,
    },
    percentage: {
      min: {
        type: Number,
        min: [0, "Percentage must be between 0 and 100"],
        max: [100, "Percentage must be between 0 and 100"],
        required: true,
      },
      max: {
        type: Number,
        min: [0, "Percentage must be between 0 and 100"],
        max: [100, "Percentage must be between 0 and 100"],
        required: true,
      },
    },
  },
  { _id: false }
);

const levelRequirementSchema = new mongoose.Schema<ILevelRequirement>(
  {
    mandatoryHours: {
      type: Number,
      min: [0, "mandatoryHours must be greater than or equal to 0"],
      required: function (this: any) {
        return this.parent().useDetailedHours;
      },
    },
    electiveHours: {
      type: Number,
      min: [0, "electiveHours must be greater than or equal to 0"],
      required: function (this: any) {
        return this.parent().useDetailedHours;
      },
    },
    totalHours: {
      type: Number,
      min: [0, "totalHours must be greater than or equal to 0"],
      required: function (this: any) {
        return !this.parent().useDetailedHours;
      },
    },
    maxYears: {
      type: Number,
      min: [1, "maxYears must be greater than or equal to 1"],
      required: true,
    },
  },
  { _id: false }
); // _id: false to prevent Mongoose from creating an _id field for each sub-document

// Define the sub-schema for graduation project requirements
const graduationProjectRequirementSchema =
  new mongoose.Schema<IGraduationProjectRequirement>(
    {
      mandatoryHours: {
        type: Number,
        min: [0, "mandatoryHours must be greater than or equal to 0"],
        required: function (this: any) {
          return this.parent().useDetailedGraduationProjectHours;
        },
      },
      electiveHours: {
        type: Number,
        min: [0, "electiveHours must be greater than or equal to 0"],
        required: function (this: any) {
          return this.parent().useDetailedGraduationProjectHours;
        },
      },
      totalHours: {
        type: Number,
        min: [0, "totalHours must be greater than or equal to 0"],
        required: function (this: any) {
          return !this.parent().useDetailedGraduationProjectHours;
        },
      },
    },
    { _id: false }
  ); // _id: false to prevent Mongoose from creating an _id field for each sub-document

// Main bylaw schema
export const bylawSchema = new mongoose.Schema<IByLaw>(
  {
    name: {
      type: String,
      required: true,
    },
    // gradeWeights is a map of grade to weight { "A": 4, "B": 3, "C": 2, "D": 1, "F": 0} values must be between 0 and 6
    gradeWeights: {
      type: Map,
      of: gradeSchema,
      required: true,
      validate: {
        validator: gradeValidationFunction,
        message:
          "Grade ranges must not overlap and must cover the entire range from 0 to 100",
      },
    },
    gpaScale: {
      type: Number,
      required: true,
    },
    // Boolean to determine which hours to use
    useDetailedHours: {
      type: Boolean,
      required: true,
    },
    // boolean to determine if detailed hours are used for graduation project
    useDetailedGraduationProjectHours: {
      type: Boolean,
      required: true,
    },
    // Map of level to minimum credits required
    levelRequirements: {
      type: Map,
      of: levelRequirementSchema,
      required: true,
      validate: {
        validator: numericKeyValidator,
        message: "Level requirement keys must be numbers",
      },
    },
    // Graduation project requirements by department
    graduationProjectRequirements: {
      type: Map,
      of: graduationProjectRequirementSchema,
      required: true,
      validate: {
        validator: departmentCodeValidator,
        message: "Invalid department code in graduationProjectRequirements",
      },
    },

    // Number of credits required to graduate
    graduateRequirement: {
      type: Number,
      required: true,
    },

    // Minimum grade required to pass a course
    coursePassCriteria: {
      type: Number,
      required: true,
    },

    yearApplied: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const bylawModelName = "ByLaw";

export const BylawModel =
  mongoose.models[bylawModelName] ||
  mongoose.model<ByLawType>(bylawModelName, bylawSchema);
