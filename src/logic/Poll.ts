import { immerable } from "immer";
import { v4 } from "uuid";
import Option from "./Option";

export default class Poll {
  constructor(title: string, options: Option[] = [], username: string) {
    this.title = title;
    this.options = options;
    this.username = username;
  }
  [immerable] = true;
  username: string;
  createdAt: Date = new Date();
  id: string = v4();
  title: string;
  options: Option[];
  addOption(option: Option) {
    if (this.options.length >= 5) {
      throw new Error(
        "Cannot add more than five options. Consider making more than one poll"
      );
    }
    this.options.push(option);
  }
}
