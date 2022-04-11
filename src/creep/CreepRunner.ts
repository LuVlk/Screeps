export interface CreepRunner {
  run: (creep: Creep, overrideMode?: unknown) => unknown;
}
