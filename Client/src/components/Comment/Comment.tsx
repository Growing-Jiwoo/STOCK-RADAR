import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/board/atoms';
import Popup from './Popup';
import {
  CommentContainer,
  CommentInfo,
  CommentInfoContainer,
  CommentName,
  CommentDate,
  CommentBtnContainer,
  CommentModifyBtn,
  CommentDeleteBtn,
  CommentModifyBtnContainer,
  CommentModifySuccessBtn,
  CommentModifyCancelBtn,
  CommentText,
  CommentTextInput,
} from './styled';

function Comment() {
  console.log('comment 렌더링');
  const [isModifyBtnClicked, setIsModifyBtnClicked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(
    'hello. We have confirmed your inquiry. We will respond individually by email as soon as possible. thank you'
  );
  const [originalCommentText] = useState<string>(commentText);
  const [, setModal] = useRecoilState(modalState);

  const handleModifyBtnClick = () => {
    setIsModifyBtnClicked(true);
  };

  const handleModifyCancelBtnClick = () => {
    setIsModifyBtnClicked(false);
    setCommentText(originalCommentText);
  };

  const handleModifySuccessBtnClick = () => {
    console.log(commentText);
  };

  const openPopup = () => {
    setModal({ isOpen: true });
  };

  return (
    <CommentContainer>
      <Popup />
      <CommentInfo>
        <CommentInfoContainer>
          <CommentName>김지우</CommentName>
          <CommentDate>작성 2023.00.00 00:00</CommentDate>
        </CommentInfoContainer>
        <CommentBtnContainer isClicked={isModifyBtnClicked}>
          <CommentModifyBtn onClick={handleModifyBtnClick}>
            수정
          </CommentModifyBtn>
          <CommentDeleteBtn onClick={openPopup}>삭제</CommentDeleteBtn>
        </CommentBtnContainer>
        <CommentModifyBtnContainer isClicked={isModifyBtnClicked}>
          <CommentModifySuccessBtn onClick={handleModifySuccessBtnClick}>
            완료
          </CommentModifySuccessBtn>
          <CommentModifyCancelBtn onClick={handleModifyCancelBtnClick}>
            취소
          </CommentModifyCancelBtn>
        </CommentModifyBtnContainer>
      </CommentInfo>
      {isModifyBtnClicked ? (
        <CommentTextInput
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      ) : (
        <CommentText>{commentText}</CommentText>
      )}
    </CommentContainer>
  );
}

export default Comment;
