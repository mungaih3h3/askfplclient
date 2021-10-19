import Comment from "../../logic/Comment";

test("It should get immediate ancestors", () => {
  const data = [
    new Comment("one", "mungai", [], "one"),
    new Comment("one-one", "lol", ["one"], "one-one"),
    new Comment("one-two", "aga", ["one"], "one-two"),

    new Comment("one-one-one", "jt", ["one", "one-one"]),
    new Comment("two", "mungai", [], "two"),
  ];

  const res1 = Comment.getImmediateSubtree("one", data);
  expect(res1).toStrictEqual([data[1], data[2]]);
  const res2 = Comment.getImmediateSubtree("two", data);
  expect(res2).toEqual([]);
});
