import { APIResponse } from '../types/api';
import { CommentData, CreateComment } from '../types/board';
import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const createComment = async (
  commentContent: CreateComment
): Promise<CreateComment> => {
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

export const getCommentList = async (
  stockName: string
): Promise<CommentData[]> => {
  try {
    const response = await instance.get(`${ApiUrl.comment}/${stockName}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
