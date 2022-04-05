import { ColonyGroup } from "./ColonyGroup";
import { CreepRole } from "./creep";
import { uniqueId } from "lodash";

export class ColonyController {
  private _creeps: Map<CreepRole, ColonyGroup> = new Map();

  public apply(group: ColonyGroup): void {
    this._creeps.set(group.creep.role, group);
  }

  public delete(role: CreepRole): Error | undefined {
    if (!this._creeps.delete(role)) return Error("role not found");
    return;
  }

  private getCreepsByRole(role: CreepRole): Creep[] {
    return Object.values(Game.creeps).filter(creep => creep.memory.role === role);
  }

  public reconcile(): void {
    for (const [creepRole, colonyGroup] of this._creeps.entries()) {
      const existingCreeps = this.getCreepsByRole(creepRole);

      if (existingCreeps.length > colonyGroup.replicas) {
        existingCreeps.pop()?.suicide();
      }

      if (existingCreeps.length < colonyGroup.replicas) {
        const spawn = Game.spawns.Spawn1;
        spawn.spawnCreep(colonyGroup.creep.bodyParts, uniqueId(colonyGroup.creep.role), {
          memory: {
            role: colonyGroup.creep.role,
            mode: colonyGroup.creep.initialMode
          }
        });
      }
    }
  }
}
