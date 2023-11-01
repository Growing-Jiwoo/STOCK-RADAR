import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Colors } from '../../style/common.styled';

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

export const S = {
  Header,
  LogoutButton,
  SpinnerWrapper,
  AgreeButton,
  DisagreeButton,
};
