import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants.js';
import { useNavigate } from 'react-router-dom';

export default function NavBarFitnessKlub(){

    const navigate = useNavigate();

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Fitness Klub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={()=>navigate(RoutesNames.HOME)}>Početna</Nav.Link>
                <Nav.Link href="https://thekalazic-001-site1.etempurl.com/swagger/index.html" target='_blank'>Swagger</Nav.Link>
                <NavDropdown title="Programi" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>navigate(RoutesNames.PRIVATNI_TRENERI_PREGLED)}>Privatni Treneri</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate(RoutesNames.CLAN_PREGLED)}>Članovi</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate(RoutesNames.GRUPA_PREGLED)}>Grupe</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        );
}