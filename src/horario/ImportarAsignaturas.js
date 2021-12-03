import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnly";
import FilaEditable from "./componentes/FilaEditable";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import '../PantallaHorarios.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';

function ImportarAsignaturas() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = window.confirm("¿Estás seguro? Se perderán todas las asignaturas importadas previamente");
    if (answer) {
   
    } else {


    }
  };


  return (
      
    <div>

            <div>
              <Link to="/"><img className="logoCab2" src={eina} /></Link>
              <div className="filtro2" style={{textAlign:'center'}}><br></br><br></br>
              <h4 className="titulo">HORARIOS</h4>
              <Link to="/">
                  <button type="button" className="btn btn-info btn-lg" style={{"margin-left": "750px", "margin-top":"15px"}}>INICIO</button>
              </Link>
              </div>
              <hr size="5px" color="black" />
            </div> <br></br>



            <ButtonGroup vertical id="buttongroup">
                <Link to="/importar-asignaturas"><button id="buttonselect" class="selected" type="button" >IMPORTAR ASIGNATURAS</button></Link>
                <Link to="/listar-asignaturas"><button id="buttonselect" type="button" >LISTAR ASIGNATURAS</button></Link>
                <Link to="/seleccion-horario-grados"><button id="buttonselect" type="button">EDITAR HORARIOS</button></Link>
            </ButtonGroup>

            <div id="import-box">
                <h3>
                    Importar Asignatura
                </h3><br></br><br></br>
                <p>
                    Selecciona el archivo excel para importar las asignaturas
                </p><br></br><br></br>
                <div id="fileform">
                <form onSubmit={handleSubmit}>
                <label>
                    <input type="file" name="file" />
                </label>
                <input id="importarbutton" type="submit" value="Importar" />
                </form>
                </div>




            </div>







    </div>
    
  );
};

export default ImportarAsignaturas;
