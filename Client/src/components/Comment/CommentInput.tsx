import {
  CommentInputContainer,
  CommentTextarea,
  CreateCommentBtn,
} from './styled';

function CommentInput() {
  console.log('CommentInput 렌더링');
  return (
    <CommentInputContainer>
      <CommentTextarea placeholder="내용을 입력하세요." />
      <CreateCommentBtn width="60px" height="100%">
        등록
      </CreateCommentBtn>
    </CommentInputContainer>
  );
}

export default CommentInput;
