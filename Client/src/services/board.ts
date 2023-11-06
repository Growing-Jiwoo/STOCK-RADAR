import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createComment, deleteComment } from '../apis/board';
import { APIResponse } from '../types/api';
import { CommentData } from '../types/board';
import { QUERY_KEYS } from '../utils/constants';

export const useCreateComment = () => {
  return useMutation<CommentData, AxiosError, CommentData>(
    (commentContent: CommentData) => createComment(commentContent),
    {
      mutationKey: [QUERY_KEYS.CREATE_COMMENT],
    }
  );
};

export const useDeleteComment = () => {
  return useMutation<APIResponse<unknown>, AxiosError, number>(
    (commentId: number) => deleteComment(commentId),
    {
      mutationKey: [QUERY_KEYS.DELETE_COMMENT],
    }
  );
};
