export function hydrateVoteCount(postId: any, voteCount: any) {
  const optionCounts = new Map();
  Object.keys(voteCount).forEach((key) => {
    optionCounts.set(key, voteCount[key]);
  });
  return new Map<string, Map<string, number>>([[postId, optionCounts]]);
}
