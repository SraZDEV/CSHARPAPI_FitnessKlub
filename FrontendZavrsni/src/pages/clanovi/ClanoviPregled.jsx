import { Link, useNavigate } from "react-router-dom";
import ClanService from "../../services/ClanService";
import { useEffect, useState } from "react";
import moment from "moment";
import { RoutesNames } from "../../constants";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";



export default function ClanPregled(){

    const[clanovi, setClanovi] = useState();

    let navigate = useNavigate();

    async function dohvatiClanove() {
        try {
            const odgovor = await ClanService.get();
            console.log(odgovor); // Provjera što vraća
            setClanovi(odgovor);
        } catch (e) {
            console.log(e);
        }
        await ClanService.get()
        .then((odgovor)=>{
            setClanovi(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    useEffect(()=>{
        dohvatiClanove();
    },[]);

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.');
    }

    function verificiran(v){
        if(v==null) return 'gray';
        if(v) return 'green';
        return 'red'
    }

    async function obrisiAsync(id) {
        const odgovor = await ClanService.obrisi(id);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiClanove();
    }

    function obrisi(id){
        obrisiAsync(id);
    }

    return(
        <>
            <Link to={RoutesNames.CLAN_NOVI}>Dodaj novog člana</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Grupa</th>
                        <th>Član od</th>
                        <th>Verificiran</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {clanovi && clanovi.map((clan,index)=>(
                        <tr key={index}>
                            <td>{clan.ime}</td>
                            <td>{clan.prezime}</td>
                            <td>{clan.email}</td>
                            <td>{clan.grupaNaziv}</td>
                            <td className="sredina">
                            {formatirajDatum(clan.clanOd)}
                            </td>
                            <td className="sredina">
                                <GrValidate 
                                size={30}
                                color={verificiran(clan.verificiran)}
                                />
                            </td>
                            <td className="sredina">
                                <Button
                                    variant="primary"
                                    onClick={()=>navigate(`/clanovi/${clan.id}`)}>
                                        Promjeni
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="danger"
                                    onClick={()=>obrisi(clan.id)}>
                                        Obriši
                                    </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );


}