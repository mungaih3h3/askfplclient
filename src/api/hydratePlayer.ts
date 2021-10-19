import Player, { PlayerRole } from "../logic/Player";

function hydrateRole(role: string) {
  switch (role) {
    case "goalkeeper":
      return PlayerRole.goalkeeper;
    case "gk":
      return PlayerRole.goalkeeper;
    case "defender":
      return PlayerRole.defender;
    case "def":
      return PlayerRole.defender;
    case "midfielder":
      return PlayerRole.midfielder;
    case "mid":
      return PlayerRole.midfielder;
    case "forward":
      return PlayerRole.forward;
    case "fwd":
      return PlayerRole.forward;
    default:
      throw new Error("Error hydrating role: " + role);
  }
}

export function hydratePlayer(player: any) {
  return new Player(player.name, hydrateRole(player.role));
}
