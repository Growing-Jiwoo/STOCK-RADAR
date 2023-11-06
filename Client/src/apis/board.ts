import { APIResponse } from '../types/api';
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

export const deleteComment = async (
  commentId: number
): Promise<APIResponse<unknown>> => {
  try {
    const response = await instance.delete(
      `${ApiUrl.comment}/delete/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
