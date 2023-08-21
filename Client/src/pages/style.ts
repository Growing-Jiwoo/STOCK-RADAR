import styled from 'styled-components';
import {
  StyledCommonContainer,
  StyledCommonButton,
} from '../style/common.styled';

const Container = styled(StyledCommonContainer)`
  box-shadow: 0 0px 70px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const SmallButton = styled(StyledCommonButton)`
  margin-bottom: 20px;
  height: 50px;
  width: 15%;
  border: none;
  border-radius: 10px;
`;

const NormalButton = styled(StyledCommonButton)`
  margin-bottom: 20px;
  height: 50px;
  width: 15%;
  border: none;
  border-radius: 10px;
  background-color: gainsboro;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
`;

export const S = {
  MainContainer,
  Title,
  Container,
  SmallButton,
  NormalButton,
  ContentWrapper,
};
