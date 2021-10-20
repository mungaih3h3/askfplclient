import { apiInstance } from "./ApiInstance";

type VoteFS = {
  pollId: string;
  optionId: string;
};

export async function getUserPollVotes(
  token: string,
  pollIds: string[]
): Promise<Map<string, string>> {
  try {
    const {
      data: { success, message, votes },
    } = await apiInstance.post<{
      votes: VoteFS[];
      success: boolean;
      message: string;
    }>(
      "/votes",
      { pollIds },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (!success) throw new Error(message);
    return new Map(votes.map((v: any) => [v.pollId, v.optionId]));
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function castVote(
  token: string,
  pollId: string,
  optionId: string
) {
  try {
    const {
      data: { success, message },
    } = await apiInstance.post<{ success: boolean; message: string }>(
      "/vote",
      { pollId, optionId },
      { headers: { authorization: token } }
    );

    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
