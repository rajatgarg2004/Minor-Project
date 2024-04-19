import './App.css';
import React from 'react';
import Nav from './Components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UCDP from './Components/UCDP';
import SWG from './Components/Statewise';
import Horizontalchart from './Components/Yearwise';
import background from './Photo1.jpg';
function App() {
  return (
    <div className="App" >
      <div style ={{"width":"1600px","height":"1000px","marginTop":"-35px","backgroundImage":`url(${background})`,"backgroundSize":"Cover","backgroundPosition":"center"}}>

      <BrowserRouter>
          <Nav/>
          <Routes>  
            <Route path="/" element={<UCDP />}/>
            <Route path = "/YWG" element = {<Horizontalchart/>}/>
            <Route path = "/SWG" element = {<SWG/>}/>
          </Routes>

          </BrowserRouter>
          </div>
    </div>
  );
}

export default App;
