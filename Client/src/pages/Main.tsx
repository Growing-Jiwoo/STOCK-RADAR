import { S } from './style';
import { useNavigate } from 'react-router';
import { PATH_NAME } from '../utils/constants';
import { MainLogo } from '../components/Main/Mainlogo';

function Main() {
  const navigate = useNavigate();

  return (
    <S.MainContainer>
      <S.Title onClick={() => navigate(PATH_NAME.SIGN_IN)}>
        <MainLogo />
      </S.Title>
    </S.MainContainer>
  );
}

export default Main;
