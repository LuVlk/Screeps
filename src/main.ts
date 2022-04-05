import { ColonyController } from "./ColonyController";
import { ColonyGroup } from "./ColonyGroup";
import { CreepController } from "./CreepController";
import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "./creep/harvester/Harvester";
import { Upgrader } from "./creep/upgrader/Upgrader";

const colonyController = new ColonyController();
const creepController = new CreepController();

const colony: ColonyGroup[] = [
  {
    creep: new Upgrader(),
    replicas: 2
  },
  {
    creep: new Harvester(),
    replicas: 2
  }
];

for (const group of colony) colonyController.apply(group);

function main(): void {
  colonyController.reconcile();
  creepController.run();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

export const loop = ErrorMapper.wrapLoop(main);
