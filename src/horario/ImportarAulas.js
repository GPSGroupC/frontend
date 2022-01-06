import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnlyAulas";
import FilaEditable from "./componentes/FilaEditableAulas";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import './PantallaHorarios.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import Api from "./servicios/api";

function ImportarAulas() {

  async function importarAulas(formdata) {
    await Api.importarAulas(formdata).then(r => {
      console.log(r.status);
      if (r.status === 200) {
        document.getElementById("file").value = "";
        window.alert("Aulas importadas con éxito");
      } else {
        window.alert("Ha ocurrido un error al importar las aulas");
      }
    }).catch(err => {
      console.log("Error al importar aulas: ", err)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const answer = window.confirm("¿Estás seguro? Se perderán todas las aulas importadas previamente");
    if (answer) {
      const formdata = new FormData()
      formdata.append('file', e.target[0].files[0]);
      formdata.append('conservarNoImportadas', document.getElementById("conservarAulas").checked);
      importarAulas(formdata);
    } else {


    }
  };


  return (

    <div>
      <div id="import-box">
        <h3>
          Importar Aulas
        </h3><br></br><br></br>
        <p>
          Selecciona el archivo excel para importar las aulas
        </p><br></br><br></br>
        <div id="fileform">
          <form onSubmit={handleSubmit}>
            <label>
              <input id="file" type="file" name="file" />
            </label>
            <input id="importarbutton" type="submit" value="Importar" />
          </form>
          <br></br><br></br>
          <label>
            <input id="conservarAulas" type="checkbox" />
            Conservar aulas que se habían añadido manualmente
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImportarAulas;
