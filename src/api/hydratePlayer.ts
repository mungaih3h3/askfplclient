import Player from "../logic/Player";

export function hydratePlayer(player: any) {
  return new Player(player.name, player.role);
}
