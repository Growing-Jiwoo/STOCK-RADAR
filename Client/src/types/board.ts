export interface CommentData {
  comment_id: number;
  comment_text: string;
  stock_id: string;
  user: string;
  create_time: string;
}

export interface CreateComment {
  comment_text: string;
  stock_id: string;
  user_id: string;
}

export interface EditComment {
  comment_text: string;
}
