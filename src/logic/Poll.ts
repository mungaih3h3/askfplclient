import { immerable } from "immer";
import { v4 } from "uuid";
import Option from "./Option";
import Comment from "../logic/Comment";
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
  comments: Comment[] = [];
}
