import { useQuery } from '@tanstack/react-query';
import { memo, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { commentIdState, modalState } from '../../recoil/board/atoms';
import { useEditComment } from '../../services/board';
import { CommentData } from '../../types/board';
import { StockDetailParams } from '../../types/stock';
import { QUERY_KEYS } from '../../utils/constants';
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

function Comment(): ReactElement {
  console.log('comment 렌더링');
  const username = storage.get('username');
  const { stockName } = useParams<StockDetailParams>();
  const [isModifyBtnClicked, setIsModifyBtnClicked] = useState<number | null>(
    null
  );
  const [commentText, setCommentText] = useState<string>('');
  const { data: getCommentList } = useQuery<CommentData[]>([
    `${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`,
  ]);

  console.log(getCommentList);
  const [, setModal] = useRecoilState(modalState);
  const [, setCommentId] = useRecoilState(commentIdState);
  const editCommentMutation = useEditComment(stockName || '');

  const handleModifyBtnClick = (index: number, initialText: string) => {
    setIsModifyBtnClicked(index);
    setCommentText(initialText);
  };

  const handleModifyCancelBtnClick = () => {
    setIsModifyBtnClicked(null);
  };

  const handleModifySuccessBtnClick = (commentId: number | undefined) => {
    if (commentId !== undefined) {
      editCommentMutation.mutate({
        commentId,
        commentText,
      });
      setIsModifyBtnClicked(null);
    } else {
      console.error('Comment ID is undefined');
    }
  };

  const openPopup = (commentId: number | undefined) => {
    if (commentId !== undefined) {
      setCommentId(commentId);
      setModal({ isOpen: true });
    } else {
      console.error('Comment ID is undefined');
    }
  };

  const formatCreateTime = (createTime: string) => {
    return createTime.replace('T', ' ').replace('Z', '');
  };

  return (
    <>
      <Popup />
      {getCommentList?.map((commentData: CommentData, index: number) => {
        const {
          comment_id: commentId,
          user,
          create_time: createTime,
          comment_text: comment,
        } = commentData;

        const isCurrentUser = user === username;

        return (
          <CommentContainer key={commentId}>
            <CommentInfo>
              <CommentInfoContainer>
                <CommentName>{user}</CommentName>
                <CommentDate>
                  작성 {formatCreateTime(createTime as string)}
                </CommentDate>
              </CommentInfoContainer>
              {isCurrentUser && (
                <>
                  <CommentBtnContainer isClicked={isModifyBtnClicked === index}>
                    <CommentModifyBtn
                      onClick={() => handleModifyBtnClick(index, comment)}
                    >
                      수정
                    </CommentModifyBtn>
                    <CommentDeleteBtn
                      onClick={() => {
                        openPopup(commentId);
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
                        handleModifySuccessBtnClick(commentId);
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
              <CommentText>{comment}</CommentText>
            )}
          </CommentContainer>
        );
      })}
    </>
  );
}

export default memo(Comment);
