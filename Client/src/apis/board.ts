import { APIResponse } from '../types/api';
import { CommentData, EditComment } from '../types/board';
import { API_URL } from '../const/apiUrl';
import { instance } from './axios';

export const createComment = async (
  commentContent: CommentData
): Promise<CommentData> => {
  try {
    const response = await instance.post(`${API_URL.comment}`, commentContent);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editComment = async (
  commentId: number,
  editCommentText: EditComment
): Promise<APIResponse<unknown>> => {
  try {
    const response = await instance.put(
      `${API_URL.comment}/update/${commentId}`,
      editCommentText
    );

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
      `${API_URL.comment}/delete/${commentId}`
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
    const response = await instance.get(`${API_URL.comment}/${stockName}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
