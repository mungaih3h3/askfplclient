import { AxiosInstance } from "axios";
import Poll from "../logic/Poll";
import hydratePoll from "./hydratePoll";
import { hydrateVoteCount } from "./hydrateVoteCount";
export type pollServer = {
  title: string;
  id: string;
  options: any[];
  createdAt: Date;
  topLevelCommentIds: string[];
};

export async function fetchPoll(
  apiInstance: AxiosInstance,
  pollId: string
): Promise<{
  poll: Poll;
  voteCount: Map<string, Map<string, number>>;
  userVotes: Map<string, string>;
}> {
  try {
    const {
      data: { poll, message, success, userVotes },
    } = await apiInstance.get<any, any>("/poll/" + pollId);
    if (!success) throw new Error(message);

    return {
      poll: hydratePoll(poll),
      voteCount: hydrateVoteCount(poll.id, poll.voteCount || {}),
      userVotes: new Map(userVotes.map((v: any) => [v.pollId, v.optionId])),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchPolls(
  apiInstance: AxiosInstance,
  startDate: Date = new Date(),
  limit: number = 20
): Promise<{
  polls: Poll[];
  hasMore: boolean;
  voteCounts: Map<string, Map<string, number>>[];
  userVotes: Map<string, string>;
}> {
  try {
    const {
      data: { polls, success, message, hasMore, userVotes },
    } = await apiInstance.get<any, any, any>(`/polls/${startDate}/${limit}`);

    if (!success) throw new Error(message);

    return {
      polls: polls.map((poll: any) => hydratePoll(poll)),
      hasMore,
      voteCounts: polls.map((poll: any) =>
        hydrateVoteCount(poll.id, poll.voteCount || {})
      ),
      userVotes: new Map(userVotes.map((v: any) => [v.pollId, v.optionId])),
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function fetchUserPolls(
  apiInstance: AxiosInstance,
  startDate: Date,
  limit: number
): Promise<{
  polls: Poll[];
  hasMore: boolean;
  voteCounts: Map<string, Map<string, number>>[];
  userVotes: Map<string, string>;
}> {
  try {
    const {
      data: { polls, success, message, hasMore, userVotes },
    } = (await apiInstance.get(`/user/polls/${startDate}/${limit}`)) as any;
    if (!success) {
      throw new Error(message);
    } else {
      return {
        polls: polls.map((poll: pollServer & { owner: string }) =>
          hydratePoll(poll)
        ),
        hasMore,
        voteCounts: polls.map((poll: any) =>
          hydrateVoteCount(poll.id, poll.voteCount || {})
        ),
        userVotes: new Map(userVotes.map((v: any) => [v.pollId, v.optionId])),
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function savePoll(apiInstance: AxiosInstance, poll: Poll) {
  try {
    const { id, options, title, createdAt } = poll;
    const {
      data: { success, message },
    } = await apiInstance.post<any, any, { poll: any }>("/save/poll", {
      poll: {
        id,
        options,
        title,
        createdAt,
      },
    });
    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
