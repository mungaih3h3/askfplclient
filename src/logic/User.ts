export default class User {
  constructor(username: string, roles: string[] = []) {
    this.username = username;
    this.roles = roles;
  }
  username: string;
  roles: string[] = [];
  hasRole(role: string) {
    return this.roles.includes(role);
  }
}
