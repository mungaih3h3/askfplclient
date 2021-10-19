import Comment from "../logic/Comment";
const dummycomments = [
  new Comment("one", "mungai", ["postid"], "one"),
  new Comment("one-one", "lol", ["postid", "one"], "one-one"),
  new Comment("one-one-one", "jt", ["postid", "one", "one-one"]),
  new Comment("two", "mungai", ["postid"], "two"),
];

export default dummycomments;
