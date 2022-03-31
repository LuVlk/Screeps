import { ColonyController } from "./ColonyController";
import { ColonyGroup } from "./ColonyGroup";
import { CreepController } from "./CreepController";
import { CreepRole } from "./creep";
import { ErrorMapper } from "utils/ErrorMapper";

const colonyController = new ColonyController();
const creepController = new CreepController();

const colony: ColonyGroup[] = [
  {
    creep: {
      role: CreepRole.HARVESTER,
      bodyParts: [WORK, CARRY, MOVE]
    },
    replicas: 2
  },
  {
    creep: {
      role: CreepRole.UPGRADER,
      bodyParts: [WORK, CARRY, MOVE]
    },
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
