import SquadResources from "../logic/SquadResources";

export function hydrateResources(resources: any) {
  return new SquadResources(resources.bank, resources.hits);
}
