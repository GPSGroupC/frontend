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
