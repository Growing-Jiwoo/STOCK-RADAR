export interface CommentData {
  comment_id?: number;
  comment_text: string;
  stock_id: string;
  user: string;
  create_time: string;
}

export interface EditComment {
  comment_text: string;
}

export type CommentListData = {
  comment_id: number;
  comment_text: string;
};

export type CommentMutationContext = {
  previousTodos: CommentListData[];
};
