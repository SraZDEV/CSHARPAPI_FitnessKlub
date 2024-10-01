import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import GrupaService from "../../services/GrupaService";
import { RoutesNames } from "../../constants";
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";



export default function ClanDodaj() {
    const navigate = useNavigate

    const [grupe, setGrupe] = useState([]);
    const [grupaId, setGrupaId] = useState(0);

    async function dohvatiGrupe(){
        const odgovor = await GrupaService.get();
        setGrupe(odgovor);
        setGrupaId(odgovor[0].sifra);
    }

    useEffect(()=>{
        dohvatiGrupe();
    },[]);

    async function dodaj(e) {
        const odgovor = await GrupaService.dodaj(e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.CLAN_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podatci = new FormData(e.target);

        dodaj({
            ime: podatci.get('ime'),
            prezime: podatci.get('prezime'),
            email: podatci.get('email'),
            grupa: parseInt(grupaId),
            clanOd: moment.utc(podatci.get('clanOd')),
            verificiran: podatci.get('verificiran')=='on' ? true : false
        });
    }

    return(
        <>
        Dodavanje novog člana

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
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='grupa'>
            <Form.Label>Grupa</Form.Label>
            <Form.Select
            onChange={(e)=>{setGrupaId(e.target.value)}}
            >
            {grupe && grupe.map((s,index)=>(
                <option key={index} value={s.id}>
                    {s.naziv}
                </option>
            ))}
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="clanOd">
                <Form.Label>Član od</Form.Label>
                <Form.Control type="date" name="clanOd" required />
        </Form.Group>
        <Form.Group controlId="verificiran">
                <Form.Check label="Verificiran" name="verificiran" />
        </Form.Group>


        <hr />
        <Row>
            <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RoutesNames.CLAN_PREGLED}
            className="btn btn-danger siroko">
            Odustani
            </Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="primary" type="submit" className="siroko">
            Dodaj novog člana
            </Button>
            </Col>
        </Row>
        </Form>
        </>
        
    );
}