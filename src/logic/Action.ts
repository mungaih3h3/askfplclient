import { immerable } from "immer";
import { v4 } from "uuid";

export default abstract class Action {
  constructor(type: string) {
    this.type = type;
  }
  [immerable] = true;
  type: string;
  id: string = v4();
}
