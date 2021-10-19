import { immerable } from "immer";
import { v4 } from "uuid";

export default class Comment {
  constructor(
    comment: string,
    username: string,
    ancestors: string[],
    id: string = v4()
  ) {
    this.comment = comment;
    this.username = username;
    this.ancestors = ancestors;
    this.id = id;
  }
  [immerable] = true;
  id: string;
  comment: string;
  username: string;
  createdAt: Date = new Date();
  ancestors: string[];
  static getImmediateSubtree(ancestor: string, comments: Comment[]) {
    const ans = [] as Comment[];
    for (const c of comments) {
      if (c.ancestors[c.ancestors.length - 1] === ancestor) ans.push(c);
    }
    return ans;
  }
}
