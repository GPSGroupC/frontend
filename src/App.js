import * as React from 'react';
import eina from './images/eina-logo.png'
import calendar from './images/calendar-logo.png'
import horario from './images/horario-logo.png'
import './App.css';
import { Link } from 'react-router-dom'


function App() {

  return (

      <div className="App">
          <div className="header">
            <img className="logoCabecera" src={eina} style={{marginTop: "15px", marginRight: "700px"}}/>
          </div>
          <hr size="5px" color="black" />

          <div className="optionCard">
            <img className="icono" src={calendar}/>
            <p id="textoImg">CALENDARIO GRADOS</p>
            <Link to="/calendario-grado">
              <button type="button" class="btn btn-info btn-lg">EDITAR</button>
            </Link>
          </div>

        <div className="optionCard">
            <img className="icono" src={horario}/>
            <p id="textoImg">HORARIOS</p>
            <Link to="/pantalla-horarios">
              <button type="button" class="btn btn-info btn-lg">EDITAR</button>
            </Link>
        </div>

        

      </div>



      
  );
}

export default App;
