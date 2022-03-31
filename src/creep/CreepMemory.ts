import { CreepRole } from "./CreepRole";

export {};

declare global {
  interface CreepMemory {
    role: CreepRole;
  }
}
