import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createComment } from '../apis/board';
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
