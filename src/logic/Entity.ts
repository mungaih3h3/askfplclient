export default abstract class Entity {
  constructor(type: string) {
    this.type = type;
  }
  type: string;
}
