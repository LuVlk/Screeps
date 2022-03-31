import { CreepRole } from "./CreepRole";

export interface CreepDefinition {
  role: CreepRole;
  bodyParts: BodyPartConstant[];
  initialState?: unknown;
}
