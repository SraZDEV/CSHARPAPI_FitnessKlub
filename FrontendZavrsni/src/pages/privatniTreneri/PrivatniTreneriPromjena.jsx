import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrivatniTrenerService from "../../services/PrivatniTrenerService";
import { RoutesNames } from "../../constants";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import ClanService from "../../services/ClanService";



export default function PrivatniTreneriPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [privatniTrener, setPrivatniTrener] = useState({});
    const [clanovi, setClanovi] = useState([]);

    async function dohvatiPrivatniTreneri(){
        const odgovor = await PrivatniTrenerService.getById(routeParams.id);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return
        }
        setPrivatniTrener(odgovor.poruka);
    }

    async function dohvatiClanove(){
        const odgovor = await ClanService.getById(routeParams.id)
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setClanovi(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiPrivatniTreneri();
        dohvatiClanove();
    },[]);

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
            cijenaSat: parseFloat(podatci.get('cijenaSat'))
        });
    }

    return(
        <Container>
            Promjena privatnih trenera
            <hr />
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={privatniTrener.ime}/>
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required 
                    defaultValue={privatniTrener.prezime}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" required 
                    defaultValue={privatniTrener.email}/>
                </Form.Group>
                <Form.Group controlId="cijenaSat">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijenaSat" step={0.01} 
                    defaultValue={privatniTrener.cijenaSat}/>
                </Form.Group>
            

            <hr />
            <Row>
                <Col key='1' xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RoutesNames.PRIVATNI_TRENERI_PREGLED}
                className="btn btn-danger siroko">
                    Odustani
                </Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                    Promjeni privatnog trenera
                </Button>
                
                </Col>
            </Row>
            </Form>
            <Col key='2' sm={12} lg={6} md={6}>
            <div style={{overflow: 'auto', maxHeight:'400px'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Članovi za trenera</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clanovi && clanovi.map((c, index) =>
                        <tr key={index}>
                            <td>
                                {c.ime} {c.prezime}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() =>
                                    obrisiClana(routeParams.clanId, c.clanId)
                                }>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
            </Col>
        </Container>
    )
}
