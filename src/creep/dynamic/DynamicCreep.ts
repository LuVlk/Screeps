import { CreepDefinition } from "../CreepDefinition";
import { CreepRole } from "../CreepRole";
import { CreepRunner } from "../CreepRunner";
import { CreepRepo } from "../../CreepRepo";

interface DynamicCreepMode {
  activeRole: CreepRole;
  modes: Map<CreepRole, unknown>;
}

export class DynamicCreep implements CreepDefinition {
  public readonly role: CreepRole = CreepRole.DYNAMIC;
  public bodyParts: BodyPartConstant[];
  public initialMode: unknown;

  private sameBodyParts(creeps: CreepDefinition[]): boolean {
    const bodyParts = new Set<BodyPartConstant[]>();
    creeps.forEach(creep => bodyParts.add(creep.bodyParts));
    return bodyParts.size === 1;
  }

  public constructor(creeps: CreepDefinition[]) {
    if (!creeps) {
      throw Error("empty creep definitions");
    } else if (this.sameBodyParts(creeps)) {
      throw Error("body parts of creep definitions are not identical");
    }

    const modes = new Map<CreepRole, unknown>();
    creeps.forEach(creep => modes.set(creep.role, creep.initialMode));

    this.bodyParts = creeps[0].bodyParts;
    this.initialMode = {
      activeRole: creeps[0].role,
      modes
    } as DynamicCreepMode;
  }
}

export const DynamicCreepRunner: CreepRunner = {
  run(creep: Creep) {
    const creepMode = creep.memory.mode as DynamicCreepMode;
    CreepRepo.get(creepMode.activeRole)?.run(creep, creepMode.modes.get(creepMode.activeRole));
  }
};
