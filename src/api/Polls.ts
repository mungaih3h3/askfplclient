import Poll from "../logic/Poll";
import { apiInstance } from "./ApiInstance";
import hydratePoll from "./hydratePoll";
export type pollServer = {
  title: string;
  id: string;
  options: any[];
  createdAt: Date;
  topLevelCommentIds: string[];
};

export async function fetchPolls(): Promise<Poll[]> {
  try {
    const {
      data: { polls, success, message },
    } = await apiInstance.get<any, any, any>("/polls");

    if (!success) throw new Error(message);
    return polls.map((poll: any) => hydratePoll(poll));
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function fetchUserPolls(token: string): Promise<Poll[]> {
  try {
    const {
      data: { polls, success, message },
    } = (await apiInstance.get("/user/polls", {
      headers: {
        authorization: token,
      },
    })) as any;
    if (!success) {
      throw new Error(message);
    } else {
      console.log(polls);
      return polls.map((poll: pollServer & { owner: string }) =>
        hydratePoll(poll)
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function savePoll(token: string, poll: Poll) {
  try {
    const { id, options, title, createdAt } = poll;
    const topLevelCommentIds = poll.comments.map((c) => c.id);
    const {
      data: { success, message },
    } = await apiInstance.post<any, any, { poll: pollServer }>(
      "/save/poll",
      {
        poll: {
          id,
          options,
          title,
          createdAt,
          topLevelCommentIds,
        },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
