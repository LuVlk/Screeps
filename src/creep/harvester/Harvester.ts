import { CreepRunner } from "../CreepRunner";
import { CreepDefinition } from "../CreepDefinition";
import { CreepRole } from "../CreepRole";

export const Harvester: CreepDefinition = {
  role: CreepRole.HARVESTER,
  bodyParts: [WORK, CARRY, MOVE]
};

export const HarvesterRunner: CreepRunner = {
  run(creep: Creep): void {
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
};
