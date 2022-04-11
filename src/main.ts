import { colonyController } from "./ColonyController";
import { ColonyGroup } from "./ColonyGroup";
import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester, HarvesterRunner } from "./creep/harvester/Harvester";
import { Upgrader, UpgraderRunner } from "./creep/upgrader/Upgrader";
import { CreepRepo } from "./CreepRepo";
import { DynamicCreep, DynamicCreepRunner } from "./creep/dynamic/DynamicCreep";
import { CreepRole } from "./creep";

CreepRepo.set(CreepRole.HARVESTER, HarvesterRunner);
CreepRepo.set(CreepRole.UPGRADER, UpgraderRunner);
CreepRepo.set(CreepRole.DYNAMIC, DynamicCreepRunner);

const colony: ColonyGroup[] = [
  {
    creep: Upgrader,
    replicas: 2
  },
  {
    creep: new DynamicCreep([Harvester, Upgrader]),
    replicas: 2
  }
];

for (const group of colony) colonyController.apply(group);

function main(): void {
  colonyController.reconcile();
  Object.values(Game.creeps).map(creep => {
    const runner = CreepRepo.get(creep.memory.role);
    if (runner) {
      console.log(`running '${creep.name}'`);
      creep.memory.mode = runner.run(creep);
    }
  });

  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

export const loop = ErrorMapper.wrapLoop(main);
