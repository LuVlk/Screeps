import { CreepRunner } from "../CreepRunner";
import { CreepDefinition } from "../CreepDefinition";
import { CreepRole } from "../CreepRole";

export class Harvester implements CreepDefinition {
  public role: CreepRole = CreepRole.HARVESTER;
  public bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
}

export class HarvesterRunner implements CreepRunner {
  public run(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns.Spawn1);
      }
    }
  }
}
