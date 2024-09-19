import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PrivatniTrenerService from "../../services/PrivatniTrenerService";



export default function PrivatniTreneriDodaj(){

    const navigate = useNavigate();

    async function dodaj(privatniTrener) {
        const odgovor = await PrivatniTrenerService.dodaj(privatniTrener);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.PRIVATNI_TRENERI_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podatci = new FormData(e.target);

        dodaj({
            ime: podatci.get('ime'),
            prezime: podatci.get('prezime'),
            email: podatci.get('email'),
            cijena: parseFloat(podatci.get('cijena'))
        })
    }

    return(
        <Container>
            Dodavanje novog trenera
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="email" required />
                </Form.Group>
                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01}/>
                </Form.Group>
                
                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.PRIVATNI_TRENERI_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}