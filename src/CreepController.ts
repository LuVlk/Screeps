import { Harvester, ICreepRole, Upgrader } from "./creeps";
import { Dictionary } from "lodash";

export class CreepController {
  private _roles: Dictionary<ICreepRole> = {
    harvester: new Harvester(),
    upgrader: new Upgrader()
  };

  public run(): void {
    Object.values(Game.creeps).map(creep => this._roles[creep.memory.role].run(creep));
  }
}
