import { immerable } from "immer";
import { v4 } from "uuid";
import Action from "./Action";

export default class Option {
  constructor(actions: Action[] = []) {
    this.actions = actions;
  }
  [immerable] = true;
  id: string = v4();
  actions: Action[];
}
