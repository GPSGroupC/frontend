import * as React from 'react';
import eina from './images/eina-logo.png'
import calendar from './images/calendar-logo.png'
import horario from './images/horario-logo.png'
import './App.css';
import { Link } from 'react-router-dom'


function App() {

  return (

      <div className="App">

        <img className="logoCabecera" src={eina} style={{marginTop: "15px", marginRight: "700px"}}/>
        <hr size="5px" color="black" />
        <br></br>

        <div class="card border-primary mb-3" style={{"max-width": "700px", "height":"200px", "margin-top":"120px", "margin-left": "27%"}}>
          <div className="inicioAux">
            <img className="icono" src={calendar}/>
            <p id="textoImg">CALENDARIO GRADOS</p>
            <Link to="/calendario-grado">
              <button type="button" class="btn btn-info btn-lg" style={{"margin-left": "70px"}}>EDITAR</button>
            </Link>
          </div>
        </div>

        <div class="card border-primary mb-3" style={{"max-width": "700px", "height":"200px", "margin-left": "27%"}}>
        <div className="inicioAux">
            <img className="icono" src={horario}/>
            <p id="textoImg">HORARIOS</p>
            <Link to="/pantalla-horarios">
              <button type="button" class="btn btn-info btn-lg" style={{"margin-left": "250px"}}>EDITAR</button>
            </Link>
          </div>
        </div>

        

      </div>



      
  );
}

export default App;
