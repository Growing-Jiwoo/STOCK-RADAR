import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { S, TitleLogoImg, MenuContainer } from './styled';
import useLogout from '../../hooks/useLogout';
import { useStockData } from '../../services/stockInfo';

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  useStockData();
  return (
    <>
      <S.Header bg="light" variant="light">
        <Container>
          <TitleLogoImg
            onClick={() => {
              navigate('/stock');
            }}
          ></TitleLogoImg>
          <MenuContainer>
            <span
              onClick={() => {
                navigate('/myInfo');
              }}
            >
              내 정보
            </span>
            <span onClick={logout}>로그아웃</span>
          </MenuContainer>
        </Container>
      </S.Header>
    </>
  );
}

export default NavBar;
