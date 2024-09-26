import { Button, Col, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/GrupaService';
import PrivatniTrenerService from '../../services/PrivatniTrenerService';
import { RoutesNames } from '../../constants';


export default function GrupePromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [privatniTreneri, setPrivatniTreneri] = useState([]);
  const [privatniTrener, setPrivatniTrenerId] = useState(0);

  const [grupa, setGrupa] = useState({});

  async function dohvatiPrivatniTreneri(){
    const odgovor = await PrivatniTrenerService.get();
    setPrivatniTreneri(odgovor);
  }

  async function dohvatiGrupa() {
    const odgovor = await Service.getById(routeParams.id);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }
    let grupa = odgovor.poruka;
    setGrupa(grupa);
    setPrivatniTrenerId(grupa.privatniTreneri); 
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiPrivatniTreneri();
    await dohvatiGrupa();
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
  },[]);

  async function promjena(e) {
    const odgovor = await Service.promjena(routeParams.id, e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RoutesNames.GRUPA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    promjena({
        naziv: podaci.get('naziv'),
        privatniTrener: parseInt(privatniTrener),
        kolicinaclanova: parseInt(podaci.get('kolicinaClanova')),
        cijena: podaci.get('cijenaSat')
    });
  }

  return (
      <>
      Mjenjanje podataka grupe
      
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" name="naziv" required defaultValue={grupa.naziv}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='privatniTrener'>
            <Form.Label>Privatni Trener</Form.Label>
            <Form.Select
            value={privatniTrener}
            onChange={(e)=>{setPrivatniTrenerId(e.target.value)}}
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
              <Form.Control type="number" name="kolicinaClanova" min={5} max={30} defaultValue={grupa.kolicinaclanova}/>
          </Form.Group>

          <Form.Group controlId="cijenaSat">
              <Form.Label>Cijena</Form.Label>
              <Form.Control type="number" name="cijena" step={0.01} required defaultValue={grupa.cijena}/>
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
                    Promjeni grupu
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}