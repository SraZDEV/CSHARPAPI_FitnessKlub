import { HttpService } from "./HttpService"


async function get() {
    return await HttpService.get('/PrivatniTrener')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data
    })
}

async function getById(id) {
    return await HttpService.get('/PrivatniTrener/' + id)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Ne postoji trener!'}
    })
}

async function obrisi(id){
    return await HttpService.delete('/PrivatniTrener/' + id)
    .then((odgovor)=>{
        //console.log(odgovor)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Privatni Trener se ne može obrisati'}
    })
} 

async function dodaj(privatniTrener) {
    return await HttpService.post('/PrivatniTrener', privatniTrener)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Privatni trener se ne može dodati!'}
        }
    })
}

async function promjena(id,privatniTrener) {
    return await HttpService.put('/PrivatniTrener/' + id,privatniTrener)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Privatni trener se ne može promijeniti!'}
        }
    })
}

async function getClanovi(clanId)
    {
        return await HttpService.get('/PrivatniTrener/Clan/' + id)
        .then((odgovor)=>{
            return {greska: false, poruka:odgovor.data}
        })
        .catch((e)=>{return{greska: true, poruka: 'Problem kod dohvaćanja člana'}})
    }


export default{
    get,
    getById,
    obrisi,
    dodaj,
    promjena,

    getClanovi
}