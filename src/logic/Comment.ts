import { immerable } from "immer";

export default class Comment {
  constructor(comment: string, username: string, comments: Comment[] = []) {
    this.comment = comment;
    this.username = username;
    this.comments = comments;
  }
  [immerable] = true;
  comment: string;
  comments: Comment[];
  username: string;
  createdAt: Date = new Date();
}
