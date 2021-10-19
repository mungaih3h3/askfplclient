import { apiInstance } from "./ApiInstance";
import { hydrateComment } from "./hydrateComment";
import Comment from "../logic/Comment";

export async function fetchComments(pollId: string) {
  try {
    const {
      data: { comments, success, message },
    } = await apiInstance.get<any, any>("/comments/" + pollId);
    console.log(comments);
    if (!success) throw new Error(message);
    return comments.map((comment: any) => hydrateComment(comment));
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function saveComment(comment: Comment, token: string) {
  try {
    const {
      data: { success, message },
    } = await apiInstance.post<any, any>(
      "/add/comment",
      {
        comment,
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
