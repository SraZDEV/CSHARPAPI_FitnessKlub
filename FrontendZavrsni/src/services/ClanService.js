import { HttpService } from "./HttpService";


async function get() {
    return await HttpService.get('/Clan')
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getById(id) {
    return await HttpService.get('/Clan/' + id)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji Clan!'}
    })
}

async function obrisi(id) {
    return await HttpService.delete('/Clan/' + id)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Clan se ne može obrisati!'}
    })
}

async function dodaj(Clan) {
    return await HttpService.post('/Clan', Clan)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n'
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Član se ne može dodati!'}
        }
    })
}

async function promjena(id, Clan) {
    return await HttpService.put('/Clan/' + id, Clan)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n'
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Član se ne može promijeniti!'}
            }
        })
}

// service traziClana
async function traziClana(uvjet){
    return await HttpService.get('/Clan/trazi/'+ uvjet)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod traženja člana'}})
}



export default{
    get,
    getById,
    obrisi,
    dodaj,
    promjena,

    traziClana
    
}
