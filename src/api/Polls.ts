import { AxiosInstance } from "axios";
import Poll from "../logic/Poll";
import { apiInstance } from "./ApiInstance";
import hydratePoll from "./hydratePoll";
import { hydrateVoteCount } from "./hydrateVoteCount";
export type pollServer = {
  title: string;
  id: string;
  options: any[];
  createdAt: Date;
  topLevelCommentIds: string[];
};

export async function fetchPoll(apiInstance: AxiosInstance, pollId: string) {
  try {
    const {
      data: { poll, message, success },
    } = await apiInstance.get<any, any>("/poll/" + pollId);
    if (!success) throw new Error(message);
    return hydratePoll(poll);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchPolls(
  startDate: Date = new Date(),
  limit: number = 20
): Promise<{
  polls: Poll[];
  hasMore: boolean;
  voteCounts: Map<string, Map<string, number>>[];
}> {
  try {
    const {
      data: { polls, success, message, hasMore },
    } = await apiInstance.get<any, any, any>(`/polls/${startDate}/${limit}`);

    if (!success) throw new Error(message);

    return {
      polls: polls.map((poll: any) => hydratePoll(poll)),
      hasMore,
      voteCounts: polls.map((poll: any) =>
        hydrateVoteCount(poll.id, poll.voteCount || {})
      ),
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
}> {
  try {
    const {
      data: { polls, success, message, hasMore },
    } = (await apiInstance.get(`/user/polls/${startDate}/${limit}`)) as any;
    if (!success) {
      throw new Error(message);
    } else {
      console.log(polls);
      return {
        polls: polls.map((poll: pollServer & { owner: string }) =>
          hydratePoll(poll)
        ),
        hasMore,
        voteCounts: polls.map((poll: any) =>
          hydrateVoteCount(poll.id, poll.voteCount || {})
        ),
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
    const topLevelCommentIds = poll.comments.map((c) => c.id);
    const {
      data: { success, message },
    } = await apiInstance.post<any, any, { poll: pollServer }>("/save/poll", {
      poll: {
        id,
        options,
        title,
        createdAt,
        topLevelCommentIds,
      },
    });
    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
