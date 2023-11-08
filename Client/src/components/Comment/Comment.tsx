import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { commentIdState, modalState } from '../../recoil/board/atoms';
import { useCommentList, useEditComment } from '../../services/board';
import { CommentData, EditComment } from '../../types/board';
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

// to do list
// 1. 조회한 주식 정보에 해당하는 댓글 갯수만큼 댓글 컴포넌트 생성 (ok)
// 2. 댓글 생성 시 댓글 생성한 user와 접속한 user가 동일한 댓글에만 수정, 삭제 버튼 보여줌 (ok)
// 3. 댓글 수정 기능 구현 (ok)
// 4. 댓글 생성, 수정, 삭제 시 변경된 서버데이터가 컴포넌트에 바로 반영될 수 있게끔 하기
// 5. 댓글 수정 버튼 클릭 시 모든 input이 동시에 움직이는 문제 해결 (ok)
// 6. 댓글 삭제 popup 하드코딩 된 부분 comment_id 들어갈 수 있게끔 하기

function Comment() {
  const username = storage.get('username');
  const { stockName } = useParams<StockDetailParams>();
  const [isModifyBtnClicked, setIsModifyBtnClicked] = useState<number | null>(
    null
  );
  const [commentText, setCommentText] = useState<string>('');
  const getCommentList = useCommentList(stockName as string);
  const [, setModal] = useRecoilState(modalState);
  const [, setCommentId] = useRecoilState(commentIdState);

  const handleModifyBtnClick = (index: number, initialText: string) => {
    setIsModifyBtnClicked(index);
    setCommentText(initialText);
  };

  const handleModifyCancelBtnClick = () => {
    setIsModifyBtnClicked(null);
  };

  const handleModifySuccessBtnClick = (commentId: number) => {
    const editCommentMutation = useEditComment();

    const editCommentText: EditComment = {
      comment_text: commentText,
    };

    editCommentMutation.mutate({ commentId, editCommentText });
    setIsModifyBtnClicked(null);
  };

  const openPopup = (comment_id: number) => {
    setCommentId(comment_id);
    setModal({ isOpen: true });
  };

  const formatCreateTime = (createTime: string) => {
    return createTime.replace('T', ' ').replace('Z', '');
  };

  return (
    <>
      <Popup />
      {getCommentList?.map((commentData: CommentData, index: number) => {
        const { comment_id, user, create_time, comment_text } = commentData;
        const isCurrentUser = user === username;

        return (
          <CommentContainer key={comment_id}>
            <CommentInfo>
              <CommentInfoContainer>
                <CommentName>{user}</CommentName>
                <CommentDate>
                  작성 {formatCreateTime(create_time as string)}
                </CommentDate>
              </CommentInfoContainer>
              {isCurrentUser && (
                <>
                  <CommentBtnContainer isClicked={isModifyBtnClicked === index}>
                    <CommentModifyBtn
                      onClick={() => handleModifyBtnClick(index, comment_text)}
                    >
                      수정
                    </CommentModifyBtn>
                    <CommentDeleteBtn
                      onClick={() => {
                        openPopup(comment_id);
                      }}
                    >
                      삭제
                    </CommentDeleteBtn>
                  </CommentBtnContainer>
                  <CommentModifyBtnContainer
                    isClicked={isModifyBtnClicked === index}
                  >
                    <CommentModifySuccessBtn
                      onClick={() => {
                        handleModifySuccessBtnClick(comment_id);
                      }}
                    >
                      완료
                    </CommentModifySuccessBtn>
                    <CommentModifyCancelBtn
                      onClick={handleModifyCancelBtnClick}
                    >
                      취소
                    </CommentModifyCancelBtn>
                  </CommentModifyBtnContainer>
                </>
              )}
            </CommentInfo>
            {isModifyBtnClicked === index ? (
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
