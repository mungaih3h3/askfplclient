import { AxiosInstance } from "axios";

type VoteFS = {
  pollId: string;
  optionId: string;
};

export async function getUserPollVotes(
  apiInstance: AxiosInstance,
  pollIds: string[]
): Promise<Map<string, string>> {
  try {
    const {
      data: { success, message, userVotes },
    } = await apiInstance.post<{
      userVotes: VoteFS[];
      success: boolean;
      message: string;
    }>("/uservotes", { pollIds });

    if (!success) throw new Error(message);
    return new Map(userVotes.map((v: any) => [v.pollId, v.optionId]));
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function castVote(
  apiInstance: AxiosInstance,
  pollId: string,
  optionId: string
) {
  try {
    const {
      data: { success, message },
    } = await apiInstance.post<{ success: boolean; message: string }>("/vote", {
      pollId,
      optionId,
    });

    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
