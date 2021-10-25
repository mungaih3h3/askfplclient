import { immerable } from "immer";
import { v4 } from "uuid";

export enum ActionType {
  chip = "chip",
  transfer = "transfer",
  captain = "captain",
  benchandplay = "benchandplay",
}

export default abstract class Action {
  constructor(type: ActionType) {
    this.type = type;
  }
  [immerable] = true;
  type: ActionType;
  id: string = v4();
}
