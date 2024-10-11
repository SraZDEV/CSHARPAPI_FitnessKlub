import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClanService from "../../services/ClanService";
import { RoutesNames } from "../../constants";
import moment from "moment";
import GrupaService from '../../services/GrupaService';
import { Button, Col, Form, Row } from "react-bootstrap";


export default function ClanoviPromjena() {

    const navigate = useNavigate();
    const routeParams = useParams();

    const [grupe, setGrupe] = useState ([]);
    const [grupaId, setGrupaId] = useState(0);

    const [clan, setClan] = useState({});

    async function dohvatiGrupe(){
        const odgovor = await GrupaService.get();
        setGrupe(odgovor);
    }
    // ubacivanje grupe
    
    async function dohvatiClan() {
        const odgovor = await ClanService.getById(routeParams.id);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        let clan = odgovor.poruka;
        setClan(clan);
        setGrupaId(clan.grupaId);
        odgovor.poruka.clanOd = moment.utc(odgovor.poruka.clanOd).format('yyyy-MM-DD');
        setClan(odgovor.poruka);
    }

    async function dohvatiInicijalnePodatke() {
        await dohvatiGrupe();
        await dohvatiClan();
    }

    useEffect(()=>{
        dohvatiInicijalnePodatke();
    },[]);

    async function promjena(e) {
        const odgovor = await ClanService.promjena(routeParams.id,e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.CLAN_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podatci = new FormData(e.target);

        promjena({
            ime: podatci.get ('ime'),
            prezime: podatci.get ('prezime'),
            email: podatci.get ('email'),
            grupaSifra: parseInt(grupaId),
            clanOd: moment.utc(podatci.get('clanOd')),
            verificiran: podatci.get ('verificiran')=='on' ? true : false
        });
    }

    return (
        <>
        Mjenjanje podataka člana
        <hr />
        <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required defaultValue={clan.ime} />
            </Form.Group>
        

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required defaultValue={clan.prezime} />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
             <Form.Control type="text" name="email" required defaultValue={clan.email} />
            </Form.Group>
        

            <Form.Group className='mb-3' controlid='grupa'>
                <Form.Label>Grupa</Form.Label>
                <Form.Select
                value={grupaId}
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
                <Form.Control type="date" name="clanOd"  
                defaultValue={clan.clanOd}/>
            </Form.Group>

            <Form.Group controlId="verificiran">
                <Form.Check label="Verificiran" name="verificiran" 
                defaultChecked={clan.verificiran}/>
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
                Promjeni člana
                </Button>
                </Col>
            </Row>
        </Form>
    </>  
    );
}