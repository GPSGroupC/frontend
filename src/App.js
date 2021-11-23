import * as React from 'react';
import eina from './images/eina-logo.png'
import calendar from './images/calendar-logo.png'
import './App.css';
import { Link } from 'react-router-dom'


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
          </div>
        </div>
      </div>
  );
}

export default App;
