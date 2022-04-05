import { CreepRole, CreepRunner } from "./creep";
import { HarvesterRunner } from "./creep/harvester/Harvester";
import { UpgraderRunner } from "./creep/upgrader/Upgrader";

class CreepController {
  private _runner: Map<CreepRole, CreepRunner> = new Map([
    [CreepRole.HARVESTER, HarvesterRunner],
    [CreepRole.UPGRADER, UpgraderRunner]
  ]);

  public run(): void {
    Object.values(Game.creeps).map(creep => this._runner.get(creep.memory.role)?.run(creep));
  }
}

export const creepController = new CreepController();
