import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usernameState } from '../../recoil/auth/atoms';
import { modalState } from '../../recoil/board/atoms';
import { useCommentList } from '../../services/board';
import { CommentData } from '../../types/board';
import { StockDetailParams } from '../../types/stock';
import storage from '../../utils/localStorage';
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
  const username = storage.get('username');

  const { stockName } = useParams<StockDetailParams>();
  const [isModifyBtnClicked, setIsModifyBtnClicked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  const getCommentList = useCommentList(stockName as string);

  // to do list
  // 1. 조회한 주식 정보에 해당하는 댓글 갯수만큼 댓글 컴포넌트 생성 (ok)
  // 2. 댓글 생성 시 댓글 생성한 user와 접속한 user가 동일한 댓글에만 수정, 삭제 버튼 보여줌 (ok)
  // 3. 댓글 수정 기능 구현
  // 4. 댓글 생성, 수정, 삭제 시 변경된 서버데이터가 컴포넌트에 바로 반영될 수 있게끔 하기

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

  const formatCreateTime = (createTime: string) => {
    return createTime.replace('T', ' ').replace('Z', '');
  };

  return (
    <>
      {getCommentList?.map((commentData: CommentData) => {
        const { comment_id, user, create_time, comment_text } = commentData;

        return (
          <CommentContainer key={comment_id}>
            <Popup />
            <CommentInfo>
              <CommentInfoContainer>
                <CommentName>{user}</CommentName>
                <CommentDate>
                  작성 {formatCreateTime(create_time as string)}
                </CommentDate>
              </CommentInfoContainer>
              <CommentBtnContainer isClicked={isModifyBtnClicked}>
                {user === username && (
                  <>
                    <CommentModifyBtn onClick={handleModifyBtnClick}>
                      수정
                    </CommentModifyBtn>
                    <CommentDeleteBtn onClick={openPopup}>
                      삭제
                    </CommentDeleteBtn>
                  </>
                )}
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
              <CommentText>{comment_text}</CommentText>
            )}
          </CommentContainer>
        );
      })}
    </>
  );
}

export default Comment;
