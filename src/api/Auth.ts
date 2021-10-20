import { apiInstance } from "./ApiInstance";

export async function authenticate(
  username: string,
  password: string
): Promise<string> {
  try {
    const {
      data: { success, message, token },
    } = await apiInstance.post<any, any>("/signin", { username, password });
    if (!success) throw new Error(message);
    return token;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function register(
  username: string,
  password: string,
  email: string
): Promise<string> {
  try {
    const {
      data: { success, message, token },
    } = await apiInstance.post<{
      success: boolean;
      message: string;
      token: string;
    }>("/signup", {
      username,
      password,
      email,
    });
    if (!success) throw new Error(message);
    return token;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
