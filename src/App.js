import * as React from 'react';
import eina from './images/eina-logo.png'
import calendar from './images/calendar-logo.png'
import './App.css';
import { Link } from 'react-router-dom'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


function App() {

  return (

      <div className="App">

        <img className="logoCab" src={eina} style={{"margin-right":"1100px"}}/>
        <hr size="5px" color="black" />
        <br></br>

        <div class="card border-primary mb-3" style={{"max-width": "700px", "height":"200px", "margin-top":"120px", "margin-left": "27%"}}>
          <div className="inicioAux">
            <img className="imagenLogos" src={calendar}/>
            <p id="textoImg">CALENDARIO GRADOS</p>
            <Link to="/calendario-grado">
              <button type="button" class="btn btn-info btn-lg" style={{"margin-left": "70px"}}>EDITAR</button>
            </Link>
            <div>
              <Link to="/calendario-pdf">
                <button type="button" class="btn btn-outline-info btn-lg">Exportar a PDF</button>
              </Link>
              <button type="button" class="btn btn-outline-info btn-lg">Exportar a iCAL</button>
            </div>
          </div>
        </div>


        <div class="card border-primary mb-3" style={{"max-width": "700px", "height":"200px", "margin-top":"50px", "margin-left": "27%"}}>
          <div className="inicioAux">
            <img className="imagenLogos" src={calendar}/>
            <p id="textoImg">CALENDARIO MÁSTERES</p>
            <button type="button" class="btn btn-info btn-lg" style={{"margin-left": "35px"}}>EDITAR</button>
            <div>
              <Link to="/calendario-pdf">
                <button type="button" class="btn btn-outline-info btn-lg">Exportar a PDF</button>
              </Link>
              <button type="button" class="btn btn-outline-info btn-lg">Exportar a iCAL</button>
            </div>
          </div>
        </div>



      </div>
  );
}

export default App;
