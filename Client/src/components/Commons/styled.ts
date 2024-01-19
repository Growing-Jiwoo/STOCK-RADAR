import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Colors, StyledCommonflexCenter } from '../../style/common.styled';
import { ReactComponent as CloseBtnImg } from '../../assets/icons/btn-close-gray.svg';

const Header = styled(Navbar)`
  width: 100%;
  margin: 0px;
  position: absolute;
  top: 0;
}
`;

const LogoutButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  letter-spacing: 0.5px;
  right: 2%;
  &:hover {
    color: #000;
  }
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface ButtonProps {
  width: string;
  height: string;
}

export const AgreeButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  border: transparent;
  background-color: ${Colors.blue};

  font-family: var(--font-nanumfont);
  font-size: 16px;
  font-weight: 900;
  color: ${Colors.white};
  cursor: pointer;

  &:hover {
    border: 1px solid ${Colors.blue};
    background-color: ${Colors.white};
    color: ${Colors.blue};
  }
`;

export const DisagreeButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  border: transparent;
  background-color: ${Colors.grayBlue};

  font-family: var(--font-nanumfont);
  font-size: 16px;
  font-weight: 900;
  color: ${Colors.white};
  cursor: pointer;

  &:hover {
    border: 1px solid ${Colors.grayBlue};
    background-color: ${Colors.white};
    color: ${Colors.grayBlue};
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

export const SubMentCenterContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  border-top: 1px solid #e5e5eb;
  border-bottom: 1px solid #e5e5eb;
  padding: 20px;
  font-family: var(--font-nanumfont);
  font-size: 17px;
  color: ${Colors.vDeepGray};
  flex-flow: column wrap;
  ${StyledCommonflexCenter}
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

export const S = {
  Header,
  LogoutButton,
  SpinnerWrapper,
  AgreeButton,
  DisagreeButton,
};

export const PopUp = {
  ClosePopupButton,
  BtnContainer,
  SubMentCenterContainer,
  SubMentContainer,
  Title,
  CloseBtn,
};
