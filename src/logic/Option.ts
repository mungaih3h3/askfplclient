import { immerable } from "immer";
import { v4 } from "uuid";
import Action from "./Action";
import SquadResources from "./SquadResources";

export default class Option {
  constructor(
    actions: Action[] = [],
    resources: SquadResources = new SquadResources()
  ) {
    this.actions = actions;
    this.resources = resources;
  }
  [immerable] = true;
  id: string = v4();
  actions: Action[];
  resources: SquadResources;
}
