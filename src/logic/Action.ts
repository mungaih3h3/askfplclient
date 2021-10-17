import { immerable } from "immer";

export default abstract class Action {
  constructor(type: string) {
    this.type = type;
  }
  [immerable] = true;
  type: string;
}
