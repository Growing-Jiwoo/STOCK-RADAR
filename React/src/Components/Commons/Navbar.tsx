import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import React from "react";

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/main">home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/trade");
              }}
            >
              trade
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
