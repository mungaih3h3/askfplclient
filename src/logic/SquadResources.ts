import { immerable } from "immer";
export default class SquadResources {
  constructor(bank: number = 0, hits: number = 0) {
    this.bank = bank;
    this.hits = hits;
  }
  [immerable] = true;
  bank: number;
  hits: number;
}
