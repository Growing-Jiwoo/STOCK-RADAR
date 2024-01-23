import styled from 'styled-components';
import {
  StyledCommonContainer,
  StyledCommonButton,
} from '../style/common.styled';
import { ReactComponent as TitleLogo } from '../assets/icons/titleLogo_small.svg';

const Container = styled(StyledCommonContainer)`
  width: 70%;
  height: 70vh;
  padding: 0 0 45px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0px 70px rgba(0, 0, 0, 0.1);
  font-family: var(--font-nanumfont);
`;

const MainContainer = styled(Container)`
  box-shadow: none;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Button = styled(StyledCommonButton)`
  margin-bottom: 20px;
  height: 50px;
  width: 15%;
  border: none;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
`;

const TitleLogoImg = styled(TitleLogo)`
  width: 40%;
  height: 40%;
`;

export const S = {
  MainContainer,
  Title,
  Container,
  Button,
  ContentWrapper,
  TitleLogoImg,
};
