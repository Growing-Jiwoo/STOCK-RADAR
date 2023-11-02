import { CommentData } from '../types/board';
import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const createComment = async (
  commentContent: CommentData
): Promise<CommentData> => {
  try {
    const response = await instance.post(`${ApiUrl.comment}`, commentContent);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
