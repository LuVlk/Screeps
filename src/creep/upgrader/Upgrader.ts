import { CreepDefinition } from "../CreepDefinition";
import { CreepRole } from "../CreepRole";
import { CreepRunner } from "../CreepRunner";

interface UpgraderMode {
  upgrading: boolean;
}

export class Upgrader implements CreepDefinition {
  public role: CreepRole = CreepRole.UPGRADER;
  public bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
  public initialState: UpgraderMode = { upgrading: false };
}

export class UpgraderRunner implements CreepRunner {
  public run(creep: Creep): void {
    if (creep.room.controller) {
      const creepMode = creep.memory.mode as UpgraderMode;

      if (!creep.store.getUsedCapacity(RESOURCE_ENERGY) && creepMode.upgrading) {
        creepMode.upgrading = false;
        creep.memory.mode = creepMode;
      } else if (!creep.store.getFreeCapacity(RESOURCE_ENERGY) && !creepMode.upgrading) {
        creepMode.upgrading = true;
        creep.memory.mode = creepMode;
      }

      if (creepMode.upgrading) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      } else {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
        }
      }
    }
  }
}
