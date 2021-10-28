import User from "../logic/User";

export function hydrateUser(user: any): User {
  return new User(user.username);
}
