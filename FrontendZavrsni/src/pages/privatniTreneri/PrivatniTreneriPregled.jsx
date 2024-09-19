import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrivatniTrenerService from "../../services/PrivatniTrenerService";
import { Button, Container, Table } from "react-bootstrap";
import { RoutesNames } from "../../constants";
import { NumericFormat } from "react-number-format";



export default function PrivatniTreneriPregled(){

    const[privatniTreneri, setPrivatniTreneri] = useState();

    const navigate = useNavigate();
    
    async function dohvatiPrivatniTreneri() {

        await PrivatniTrenerService.get()
        .then((odgovor)=>{
            setPrivatniTreneri(odgovor)
        })
        .catch((e)=>{console.log(e)});
        
    }

    useEffect(()=>{
        dohvatiPrivatniTreneri;
    },[]);

    async function obrisiAsync(id) {
        const odgovor = await PrivatniTrenerService.obrisi(id);
        //console.log(odgovor)
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiPrivatniTreneri();
    }

    function obrisi(id){
        obrisiAsync(id);
    }

    return
        <Container>
            <Link to={RoutesNames.PRIVATNI_TRENERI_NOVI}>Dodaj novog trenera</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Cijena po satu</th>
                    </tr>
                </thead>
                <tbody>
                    {privatniTreneri && privatniTreneri.map((privatniTreneri,index)=>(
                        <tr key={index}>
                            <td>{privatniTreneri.ime}</td>
                            <td className={privatniTreneri.ime==null ? 'sredina' : 'desno'}>
                                {privatniTreneri.ime==null ? 'Nije definirano' : privatniTreneri.ime}

                            </td>
                            <td>{privatniTreneri.prezime}</td>
                            <td className={privatniTreneri.prezime==null ? 'sredina' : 'desno'}>
                                {privatniTreneri.prezime==null ? 'Nije definirano' : privatniTreneri.prezime}

                            </td>
                            <td>{privatniTreneri.email}</td>
                            <td className={privatniTreneri.email==null ? 'sredina' : 'desno'}>
                                {privatniTreneri.email==null ? 'Nije definirano' : privatniTreneri.email}

                            </td>
                            <td className={privatniTreneri.cijena==null ? 'sredina' : 'desno'}>
                                {privatniTreneri.cijena==null 
                                ? 'Nije definirano' : 
                                <NumericFormat
                                value={privatniTreneri.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2}
                                fixedDecimalScale
                                />}
                            </td>
                            <Button>
                                
                            </Button>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

}