import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrivatniTrenerService from "../../services/PrivatniTrenerService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";



export default function PrivatniTreneriPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [privatniTrener] = useState({});

    async function dohvatiPrivatniTreneri(){
        const odgovor = await PrivatniTrenerService.getById(routeParams.id);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return
        }
    }

    useEffect(()=>{
        dohvatiPrivatniTreneri();
    });

    async function promjena(privatniTrener){
        //console.log(privatniTrener)
        const odgovor = await PrivatniTrenerService.promjena(routeParams.id,privatniTrener);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.PRIVATNI_TRENERI_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podatci = new FormData(e.target);

        promjena({
            ime: podatci.get('ime'),
            prezime: podatci.get('prezime'),
            email: podatci.get('email'),
            cijena: parseFloat(podatci.get('cijena'))
        });
    }

    return(
        <Container>
            Promjena privatnih trenera
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="email" required />
                </Form.Group>
                <Form.Group controlId="cijena">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} />
                </Form.Group>
            </Form>
            <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RoutesNames.PRIVATNI_TRENERI_PREGLED}
                className="btn btn-danger siroko">
                    Odustani
                </Link>
                </Col>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                    Promjeni privatnog trenera
                </Button>
                </Col>
            </Row>
        </Container>
    )
}
