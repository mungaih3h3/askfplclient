import { v4 } from "uuid";
export enum PlayerRole {
  goalkeeper = "gk",
  defender = "def",
  midfielder = "mid",
  forward = "fwd",
}
export default class Player {
  constructor(name: string, role: PlayerRole) {
    this.name = name;
    this.role = role;
  }
  id: string = v4();
  name: string;
  role: PlayerRole;
}
