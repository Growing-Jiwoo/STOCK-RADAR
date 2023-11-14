import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import {
  createComment,
  deleteComment,
  editComment,
  getCommentList,
} from '../apis/board';
import { queryClient } from '../react-query/queryClient';
import { APIResponse } from '../types/api';
import {
  CommentData,
  CommentListData,
  CreateComment,
  CommentMutationContext,
} from '../types/board';
import { StockDetailParams } from '../types/stock';
import { QUERY_KEYS } from '../utils/constants';

export const useCreateComment = () => {
  return useMutation<CreateComment, AxiosError, CreateComment>(
    [QUERY_KEYS.CREATE_COMMENT],
    (commentContent: CreateComment) => createComment(commentContent)
  );
};

export const useEditComment = (stockName: string) => {
  return useMutation<
    APIResponse<unknown>,
    AxiosError,
    { commentId: number; commentText: string },
    CommentMutationContext
  >(
    [QUERY_KEYS.EDIT_COMMENT],
    ({ commentId, commentText }) =>
      editComment(commentId, { comment_text: commentText }),
    {
      onMutate: async (newTodo: { commentId: number; commentText: string }) => {
        // 현재 요청을 취소하고 이전 쿼리 데이터를 백업.
        await queryClient.cancelQueries({
          queryKey: [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
        });

        // 이전 댓글 목록 데이터를 가져오기
        const previousTodos: CommentData[] =
          queryClient.getQueryData<CommentData[]>([
            `${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`,
          ]) || [];

        // 수정된 댓글이 있으면 해당 데이터를 업데이트
        const updatedData = previousTodos.map((comment: CommentData) => {
          if (comment.comment_id === newTodo.commentId) {
            return { ...comment, comment_text: newTodo.commentText };
          }
          return comment;
        });

        // 수정된 데이터로 쿼리 데이터를 업데이트.
        queryClient.setQueryData<CommentData[]>(
          [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
          updatedData
        );

        // 이전 데이터를 반환하여 나중에 롤백할 때 사용.
        return { previousTodos };
      },
      onError: (err, newTodo, context) => {
        // onError시 이전 데이터로 롤백
        queryClient.setQueryData<CommentListData[]>(
          [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
          context?.previousTodos
        );
      },

      onSettled: () => {
        // mutation이 완료되면 해당 쿼리를 무효화하여 최신 데이터를 다시 불러옴.
        queryClient.invalidateQueries([
          `${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`,
        ]);
      },
    }
  );
};

export const useDeleteComment = () => {
  const { stockName } = useParams<StockDetailParams>();

  return useMutation<
    APIResponse<unknown>,
    AxiosError,
    number,
    CommentMutationContext
  >(
    [QUERY_KEYS.DELETE_COMMENT],
    (commentId: number) => deleteComment(commentId),
    {
      onMutate: async (commentId: number) => {
        // 현재 요청을 취소하고 이전 쿼리 데이터를 백업.
        await queryClient.cancelQueries({
          queryKey: [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
        });

        // 이전 댓글 목록 데이터를 가져오기
        const previousTodos: CommentData[] =
          queryClient.getQueryData<CommentData[]>([
            `${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`,
          ]) || [];

        // 삭제하려는 댓글을 찾아서 제거
        const updatedTodos: CommentData[] = previousTodos.filter(
          (todo) => todo.comment_id !== commentId
        );
        // 수정된 데이터로 쿼리 데이터를 업데이트
        queryClient.setQueryData(
          [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
          updatedTodos
        );

        // 이전 데이터를 반환하여 나중에 롤백할 때 사용.
        return { previousTodos };
      },
      onError: (err, commentId, context) => {
        // onError시 이전 데이터로 롤백
        queryClient.setQueryData<CommentListData[]>(
          [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
          context?.previousTodos
        );
      },
      onSettled: () => {
        // mutation이 완료되면 해당 쿼리를 무효화하여 최신 데이터를 다시 불러옴.
        queryClient.invalidateQueries([
          `${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`,
        ]);
      },
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
      staleTime: 0,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return commentList;
};
