import Player, { PlayerRole } from "../logic/Player";

const dummyplayers = [
  new Player("Christiano lukaku", PlayerRole.forward),
  new Player("Romelu ronaldo", PlayerRole.forward),
  new Player("Sadio Salah", PlayerRole.midfielder),
  new Player("Mohammed Mane", PlayerRole.midfielder),
  new Player("David degea", PlayerRole.goalkeeper),
  new Player("Luke shaw", PlayerRole.defender),
];

export default dummyplayers;
