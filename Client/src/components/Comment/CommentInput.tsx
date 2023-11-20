import React, { memo, ReactElement, useState } from 'react';
import { useCreateComment } from '../../services/board';
import { CommentData } from '../../types/board';
import { formatDateTime } from '../../utils/formatDateTime';
import {
  CommentInputContainer,
  CommentTextarea,
  CreateCommentBtn,
} from './styled';

interface CommentInputProps {
  stockName: string;
}

function CommentInput({ stockName }: CommentInputProps): ReactElement {
  console.log('commentInput 렌더링');
  const [commentText, setCommentText] = useState<string>('');
  const createTime = formatDateTime();
  const commentContent: CommentData = {
    comment_text: commentText,
    stock_id: stockName,
    user: 'test',
    create_time: createTime,
  };

  const createCommentMutation = useCreateComment();

  const handleCreateComment = () => {
    createCommentMutation.mutate(commentContent);
    setCommentText('');
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };

  return (
    <CommentInputContainer>
      <CommentTextarea
        placeholder="내용을 입력하세요."
        value={commentText}
        onChange={handleCommentChange}
      />
      <CreateCommentBtn
        width="60px"
        height="100%"
        onClick={handleCreateComment}
      >
        등록
      </CreateCommentBtn>
    </CommentInputContainer>
  );
}

export default memo(CommentInput);
