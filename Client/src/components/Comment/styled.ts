import styled from 'styled-components';
import { Colors } from '../../style/common.styled';
import { AgreeButton, DisagreeButton } from '../Commons/styled';
import { ReactComponent as CloseBtnImg } from '../../assets/icons/btn-close-gray.svg';

export const CommentContainer = styled.div`
  width: 80%;
  min-height: 104px;
  border-top: 1px solid ${Colors.grayBlue};
  border-bottom: 1px solid ${Colors.grayBlue};
  padding: 11px 18px;
  margin-top: 5px;
`;

export const CommentInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-flow: row;
`;

export const CommentInfoContainer = styled.div`
  display: flex;
`;

export const CommentName = styled.p`
  font-family: var(--font-nanumfont);
  font-size: 16px;
  font-weight: 700;
  color: ${Colors.vDeepGray};
`;

export const CommentDate = styled.p`
  font-size: 12px;
  color: ${Colors.grayBlue};
  margin: 4px 0 0 19px;
`;

export const CommentModifyBtn = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.blue};
  cursor: pointer;
`;

export const CommentDeleteBtn = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.purple};
  margin-left: 34px;
  cursor: pointer;
`;

interface ModifyBtnProps {
  isClicked?: boolean;
}

export const CommentModifyBtnContainer = styled.div<ModifyBtnProps>`
  display: ${(props) => (props.isClicked ? 'flex' : 'none')};
`;

export const CommentBtnContainer = styled.div<ModifyBtnProps>`
  display: ${(props) => (props.isClicked ? 'none' : 'flex')};
`;

export const CommentModifySuccessBtn = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.blue};
  cursor: pointer;
`;

export const CommentModifyCancelBtn = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.purple};
  margin-left: 34px;
  cursor: pointer;
`;

export const CommentText = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 11px 0 0;
  color: ${Colors.vDeepGray};
`;

export const CommentInputContainer = styled.div`
  width: 850px;
  height: 100px;
  margin: 10px 0px;
  padding: 15px 20px 15px 20px;
  border-radius: 6px;
  border: 1px solid #e5e5eb;
  background-color: #fff;
  display: flex;
  flex-flow: column wrap;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  height: 58px;
  word-wrap: break-word;
  border: transparent;
  resize: none;
  outline: none;
  font-size: 16px;
`;

export const CreateCommentBtn = styled(AgreeButton)`
  margin-left: 30px;
`;

export const CommentTextInput = styled.input`
  width: 100%;
  height: 41px;
  margin-top: 11px;
  padding: 16px 10px;
  border: solid 1px ${Colors.grayBlue};
  background-color: #fff;
  font-size: 16px;
  color: ${Colors.vDeepGray};
  border-radius: 6px;

  &:focus {
    outline: none;
  }
`;

export const CloseBtn = styled(CloseBtnImg)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-family: var(--font-nanumfont);
  font-size: 22px;
  font-weight: 900;
  color: ${Colors.vDeepGray};
  padding: 0 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubMentContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  border-top: 1px solid #e5e5eb;
  border-bottom: 1px solid #e5e5eb;
  padding: 20px;
  font-family: var(--font-nanumfont);
  font-size: 17px;
  color: ${Colors.vDeepGray};
`;

export const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 19px 0px 0px;
`;

export const ClosePopupButton = styled(DisagreeButton)`
  margin-right: 15px;
`;
