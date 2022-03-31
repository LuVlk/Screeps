import { CreepRunner, Harvester, Upgrader } from "./creep/runner";
import { CreepRole } from "./creep";

export class CreepController {
  private _runner: Map<CreepRole, CreepRunner> = new Map([
    [CreepRole.HARVESTER, new Harvester()],
    [CreepRole.UPGRADER, new Upgrader()]
  ]);

  public run(): void {
    Object.values(Game.creeps).map(creep => this._runner.get(creep.memory.role)?.run(creep));
  }
}
