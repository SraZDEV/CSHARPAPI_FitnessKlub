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
        dohvatiPrivatniTreneri();
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

    return(
        <Container>
            <Link to={RoutesNames.PRIVATNI_TRENERI_NOVI}>Dodaj novog trenera</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Cijena po satu</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {privatniTreneri && privatniTreneri.map((privatniTrener,index)=>(
                        <tr key={index}>
                            <td>{privatniTrener.ime}</td>
                            
                            <td>{privatniTrener.prezime}</td>
                            
                            <td>{privatniTrener.email}</td>
                            
                            <td className={privatniTrener.cijenaSat==null ? 'sredina' : 'desno'}>
                                {privatniTrener.cijenaSat==null 
                                ? 'Nije definirano' : 
                                <NumericFormat
                                value={privatniTrener.cijenaSat}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2}
                                fixedDecimalScale
                                />}
                            </td>
                            <td className="sredina">
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/privatniTreneri/${privatniTrener.id}`)}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(privatniTrener.id)}>
                                Obriši
                            </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}