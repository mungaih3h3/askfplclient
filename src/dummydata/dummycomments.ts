import Comment from "../logic/Comment";
const dummycomments = [
  new Comment("Hello 1", "mungai", [new Comment("Hello 1-1", "mungai", [])]),
  new Comment("Hello 2", "mungai", [
    new Comment("Hello 2-1", "mungai", [new Comment("Hello 2-1-1", "mungai")]),
  ]),
];

export default dummycomments;
