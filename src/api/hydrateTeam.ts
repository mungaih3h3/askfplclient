import Team from "../logic/Team";

export function hydrateTeam(team: any) {
  return new Team(team.name, team.shortName);
}
