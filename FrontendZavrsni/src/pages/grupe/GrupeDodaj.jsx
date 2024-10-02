import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/GrupaService';
import PrivatniTrenerService from '../../services/PrivatniTrenerService';
import { RoutesNames } from '../../constants';


export default function GrupeDodaj() {
  const navigate = useNavigate();

  const [privatniTreneri, setPrivatniTreneri] = useState([]);
  const [privatniTrener, setPrivatniTrener] = useState(0);

  async function dohvatiPrivatniTreneri(){
    const odgovor = await SmjerService.get();
    setPrivatniTreneri(odgovor);
    setPrivatniTrener(odgovor[0].id);
  }

  useEffect(()=>{
    dohvatiPrivatniTreneri();
  },[]);


  
  async function dodaj(e) {
    const odgovor = await Service.dodaj(e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.GRUPA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodaj({
      naziv: podaci.get('naziv'),
      privatniTrener: parseInt(privatniTrener),
      kolicinaClanova: parseInt(podaci.get('kolicinaClanova')),
      cijenaSat: parseFloat(podatci.get('cijenaSat'))
    });
  }

  return (
      <>
      Dodavanje nove grupe
      
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" name="naziv" required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='smjer'>
            <Form.Label>Privatni Trener</Form.Label>
            <Form.Select 
            onChange={(e)=>{setPrivatniTrener(e.target.value)}}
            >
            {privatniTreneri && privatniTreneri.map((s,index)=>(
              <option key={index} value={s.id}>
                {s.ime}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="kolicinaClanova">
              <Form.Label>Količina članova</Form.Label>
              <Form.Control type="number" name="kolicinaClanova" min={5} max={30} />
          </Form.Group>

          <Form.Group controlId="cijenaSat">
              <Form.Label>Cijena</Form.Label>
              <Form.Control type="text" name="cijenaSat" required />
          </Form.Group>


          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RoutesNames.GRUPA_PREGLED}
              className="btn btn-danger siroko">
                    Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                    Dodaj novu grupu
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}