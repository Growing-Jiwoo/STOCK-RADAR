import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createComment,
  deleteComment,
  editComment,
  getCommentList,
} from '../apis/board';
import { APIResponse } from '../types/api';
import { CommentData, CreateComment, EditComment } from '../types/board';
import { QUERY_KEYS } from '../utils/constants';

export const useCreateComment = () => {
  return useMutation<CreateComment, AxiosError, CreateComment>(
    (commentContent: CreateComment) => createComment(commentContent),
    {
      mutationKey: [QUERY_KEYS.CREATE_COMMENT],
    }
  );
};

export const useEditComment = () => {
  return useMutation<
    APIResponse<unknown>,
    AxiosError,
    { commentId: number; editCommentText: EditComment }
  >(
    ({ commentId, editCommentText }) => editComment(commentId, editCommentText),
    {
      mutationKey: [QUERY_KEYS.EDIT_COMMENT],
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

export const useCommentList = (stockName: string) => {
  const { data: commentList } = useQuery<
    CommentData[],
    AxiosError,
    CommentData[],
    QueryKey
  >(
    [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
    () => getCommentList(stockName),
    {
      staleTime: 2 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return commentList;
};
