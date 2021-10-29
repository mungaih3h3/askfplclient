import { hydrateComment } from "./hydrateComment";
import Comment from "../logic/Comment";
import { AxiosInstance } from "axios";
export async function voteComment(
  apiInstance: AxiosInstance,
  commentId: string,
  upOrDown: string
) {
  try {
    const {
      data: { success, message },
    } = await apiInstance.post<any, any>("/vote/comment", {
      commentId,
      upOrDown,
    });
    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function fetchComments(
  apiInstance: AxiosInstance,
  pollId: string
): Promise<{
  comments: Comment[];
  userCommentVotes: Map<string, "up" | "down">;
}> {
  try {
    const {
      data: { comments, success, message, userCommentVotes },
    } = await apiInstance.get<any, any>("/comments/" + pollId);
    console.log(comments);
    if (!success) throw new Error(message);
    return {
      comments: comments.map((comment: any) => hydrateComment(comment)),
      userCommentVotes: new Map(
        userCommentVotes.map((u: any) => [u.commentId, u.upOrDown])
      ),
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function saveComment(
  apiInstance: AxiosInstance,
  comment: Comment
): Promise<void> {
  try {
    const {
      data: { success, message },
    } = await apiInstance.post<any, any>("/add/comment", {
      comment,
    });
    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
