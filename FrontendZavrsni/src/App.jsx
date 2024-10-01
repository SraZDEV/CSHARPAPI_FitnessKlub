import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from "react-router-dom";
import NavBarFitnessKlub from "./components/NavBarFitnessKlub";
import { RoutesNames } from "./constants";
import Pocetna from "./pages/Pocetna";
import PrivatniTreneriPregled from "./pages/privatniTreneri/PrivatniTreneriPregled";
import PrivatniTreneriDodaj from "./pages/privatniTreneri/PrivatniTreneriDodaj";
import PrivatniTreneriPromjena from "./pages/privatniTreneri/PrivatniTreneriPromjena";
import GrupePregled from './pages/grupe/GrupePregled'
import GrupeDodaj from './pages/grupe/GrupeDodaj'
import GrupePromjena from './pages/grupe/GrupePromjena'
import ClanoviPregled from './pages/clanovi/ClanoviPregled';
import ClanoviDodaj from './pages/clanovi/ClanoviDodaj';
import ClanoviPromjena from './pages/clanovi/ClanoviPromjena';
import { Container } from 'react-bootstrap';

function App() {

  function godina(){
    const pocetna = 2024;
    const trenutna = new Date().getFullYear();
    if(pocetna===trenutna){
      return trenutna;
    }
    return pocetna + ' - ' + trenutna;
  }


    return (
      <>
      <Container className='aplikacija'>
        <NavBarFitnessKlub /> 
        <Routes>
            <Route path={RoutesNames.HOME} element={<Pocetna />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_PREGLED} element={<PrivatniTreneriPregled />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_NOVI} element={<PrivatniTreneriDodaj />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_PROMJENA} element={<PrivatniTreneriPromjena />} />

            <Route path={RoutesNames.GRUPA_PREGLED} element={<GrupePregled />} />
            <Route path={RoutesNames.GRUPA_NOVI} element={<GrupeDodaj />} />
            <Route path={RoutesNames.GRUPA_PROMJENA} element={<GrupePromjena />} />

            <Route path={RoutesNames.CLAN_PREGLED} element={<ClanoviPregled />} />
            <Route path={RoutesNames.CLAN_NOVI} element={<ClanoviDodaj />} />
            <Route path={RoutesNames.CLAN_PROMJENA} element={<ClanoviPromjena />} />
        </Routes>
        </Container>
        <Container>
          <hr />
          Fitness Klub &copy; {godina()}
        </Container>
      </>
    )
    
}

export default App