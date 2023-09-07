import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { S } from './styled';
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
          <Navbar.Brand href="/main">home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/trade');
              }}
            >
              trade
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/trade');
              }}
            >
              trade
            </Nav.Link>
          </Nav>
        </Container>
        <S.LogoutButton onClick={logout}>Logout</S.LogoutButton>
      </S.Header>
    </>
  );
}

export default NavBar;
