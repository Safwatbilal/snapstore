import { ICommentForm } from "./type";
import axios from "@/lib/axios";
import { API_BASE_URL } from "@/lib/axios";
const API = {
  addComment: async (body: ICommentForm) => {
    const { data } = await axios.post(API_BASE_URL + "/comments.json", body);
    return data;
  },
  getAllComment: async (productId: string) => {
    const { data } = await axios.get<Record<string, ICommentForm>>(
      `${API_BASE_URL}/comments.json`,
    );

    if (!data) return [];

    return Object.entries(data)
      .map(([id, comment]) => ({ ...comment, id }))
      .filter((comment) => comment.productId === productId);
  },
};
export default API;
