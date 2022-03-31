import { CreepRunner } from "../CreepRunner";
import { CreepDefinition } from "../CreepDefinition";
import { CreepRole } from "../CreepRole";

interface UpgraderState {
  upgrading: boolean;
}

export class Upgrader implements CreepDefinition {
  public role: CreepRole = CreepRole.UPGRADER;
  public bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
  public initialState: UpgraderState = { upgrading: false };
}

export class UpgraderRunner implements CreepRunner {
  public run(creep: Creep): void {
    if (creep.room.controller) {
      const creepState = creep.memory.state as UpgraderState;

      if (!creep.store.getUsedCapacity(RESOURCE_ENERGY) && creepState.upgrading) {
        creepState.upgrading = false;
        creep.memory.state = creepState;
      } else if (!creep.store.getFreeCapacity(RESOURCE_ENERGY) && !creepState.upgrading) {
        creepState.upgrading = true;
        creep.memory.state = creepState;
      }

      if (creepState.upgrading) {
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
