import { AxiosInstance } from "axios";

export async function feedback(apiInstance: AxiosInstance, feedback: string) {
  try {
    const {
      data: { success, message },
    } = await apiInstance.post<any, any>("/feedback", { feedback });
    if (!success) throw new Error(message);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
