import { Route, Routes } from "react-router-dom";
import NavBarFitnessKlub from "./components/NavBarFitnessKlub";
import { RoutesNames } from "./constants";
import Pocetna from "./pages/Pocetna";
import PrivatniTreneriPregled from "./pages/privatniTreneri/PrivatniTreneriPregled";
import PrivatniTreneriDodaj from "./pages/privatniTreneri/PrivatniTreneriDodaj";
import PrivatniTreneriPromjena from "./pages/privatniTreneri/PrivatniTreneriPromjena";


function App() {


    return (
      <>
        <NavBarFitnessKlub>
        <Routes>
            <Route path={RoutesNames.HOME} element={<Pocetna />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_PREGLED} element={<PrivatniTreneriPregled />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_NOVI} element={<PrivatniTreneriDodaj />} />
            <Route path={RoutesNames.PRIVATNI_TRENERI_PROMJENA} element={<PrivatniTreneriPromjena />} />
        </Routes>
        </NavBarFitnessKlub>
      </>
    )
    
}

export default App