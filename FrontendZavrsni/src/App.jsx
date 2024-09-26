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

function App() {


    return (
      <>
        <NavBarFitnessKlub /> 
        <Routes>
            <Route path={RoutesNames.HOME} element={<Pocetna />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_PREGLED} element={<PrivatniTreneriPregled />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_NOVI} element={<PrivatniTreneriDodaj />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_PROMJENA} element={<PrivatniTreneriPromjena />} />

            <Route path={RoutesNames.GRUPA_PREGLED} element={<GrupePregled />} />
            <Route path={RoutesNames.GRUPA_NOVI} element={<GrupeDodaj />} />
            <Route path={RoutesNames.GRUPA_PROMJENA} element={<GrupePromjena />} />
        </Routes>
      </>
    )
    
}

export default App