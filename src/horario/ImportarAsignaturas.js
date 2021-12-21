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
import Api from "./servicios/api";

function ImportarAsignaturas() {

  async function importarAsignaturas(formdata) {
    await Api.importarAsignaturas(formdata).then(r => {
      console.log(r.status);
      if (r.status === 200) {
        window.alert("Asignaturas importadas con éxito");
      } else {
        window.alert("Ha ocurrido un error al importar las asignaturas");
      }
    }).catch(err => {
      console.log("Error al importar asignaturas: ", err)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const answer = window.confirm("¿Estás seguro? Se perderán todas las asignaturas importadas previamente");
    if (answer) {
      const formdata = new FormData()
      formdata.append('file', e.target[0].files[0]);
      formdata.append('conservarNoImportadas', document.getElementById("conservarAsignaturas").checked);
      importarAsignaturas(formdata);
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
          <br></br><br></br>
          <label>
            <input id="conservarAsignaturas" type="checkbox" />
            Conservar asignaturas que se habían añadido manualmente
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImportarAsignaturas;
