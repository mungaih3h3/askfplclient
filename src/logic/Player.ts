import { v4 } from "uuid";
export enum PlayerRole {
  goalkeeper = "gk",
  defender = "def",
  midfielder = "mid",
  forward = "fwd",
}
export default class Player {
  constructor(name: string, role: PlayerRole, valid: boolean = true) {
    this.name = name;
    this.role = role;
    this.valid = valid;
  }
  id: string = v4();
  name: string;
  role: PlayerRole;
  valid: boolean;
  static getNull(role: PlayerRole = PlayerRole.defender) {
    return new Player("", role, false);
  }
}
