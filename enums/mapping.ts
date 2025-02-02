// It acts like an enum, where each key represents a specific program mode,
// and the corresponding value is a string identifier for that mode.
export const ProgramModeEnumMap = {
  GROUP: "group",
  ONE_ON_ONE: "1on1",
  ANNOUNCEMENT: "announcement",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
};

/*
    typeof ProgramModeEnumMap infers the type of the ProgramModeEnumMap object, which is:
    {
        GROUP: string;
        ONE_ON_ONE: string;
        ANNOUNCEMENT: string;
        SELF_DIRECTED: string;
        PLANNED_ONE_ON_ONE: string;
        PLANNED_SELF_DIRECTED: string;
    }
*/
export type ProgramMap = typeof ProgramModeEnumMap;

// keyof ProgramMap represents the union of all possible values in the programModeEnumMap object
// Example: "GROUP" | "ONE_ON_ONE" | "ANNOUNCEMENT" | "SELF_DIRECTED" | "PLANNED_ONE_ON_ONE" | "PLANNED_SELF_DIRECTED"

// ProgramMap[keyof ProgramMap] then extracts the type of the values associated with these keys, which is
// Example: "group" | "1on1" | "announcement" | "selfDirected" | "planned1on1" | "plannedSelfDirected"
export type Program = ProgramMap[keyof ProgramMap];

// Example Usage
const mode: Program = "group"; // Valid
const anotherMode: Program = "1on1"; // Valid
const invalidMode: Program = "invalid"; // Error: Type '"invalid"' is not assignable to type 'Program'.
