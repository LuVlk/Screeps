import { CreepController } from "./CreepController";
import { ErrorMapper } from "utils/ErrorMapper";

const creepController = new CreepController();

export const loop = ErrorMapper.wrapLoop(() => {
  creepController.run();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
