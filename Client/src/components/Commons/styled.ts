import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

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

export const S = {
  Header,
  LogoutButton,
  SpinnerWrapper,
};
