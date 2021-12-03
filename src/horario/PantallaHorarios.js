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

function PantallaHorarios() {

  const [asignaturas, setAsignaturas] = useState(data);
  const [addFormData, setAddFormData] = useState({
    plan: "",
    area: "",
    codigo: "",
    nombre: "",
    curso: "",
    periodo: "",
    horas_estud1: "",
    horas_estud2: "",
    horas_estud3: "",
  });

  const [editFormData, setEditFormData] = useState({
    plan: "",
    area: "",
    codigo: "",
    nombre: "",
    curso: "",
    periodo: "",
    horas_estud1: "",
    horas_estud2: "",
    horas_estud3: "",
  });

  const [editAsignaturaId, setEditAsignaturaId] = useState(null);




  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };




  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newAsignatura = {
      id: nanoid(),
      plan: addFormData.plan,
      area: addFormData.area,
      codigo: addFormData.codigo,
      nombre: addFormData.nombre,
      curso: addFormData.curso,
      periodo: addFormData.periodo,
      horas_estud1: addFormData.horas_estud1,
      horas_estud2: addFormData.horas_estud2,
      horas_estud3: addFormData.horas_estud3,
    };

    const newAsignaturas = [...asignaturas, newAsignatura];
    setAsignaturas(newAsignaturas);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedAsignatura = {
      id: editAsignaturaId,
      plan: editFormData.plan,
      area: editFormData.area,
      codigo: editFormData.codigo,
      nombre: editFormData.nombre,
      curso: editFormData.curso,
      periodo: editFormData.periodo,
      horas_estud1: editFormData.horas_estud1,
      horas_estud2: editFormData.horas_estud2,
      horas_estud3: editFormData.horas_estud3,
     
    };

    const newAsignaturas = [...asignaturas];

    const index = asignaturas.findIndex((asignatura) => asignatura.id === editAsignaturaId);

    newAsignaturas[index] = editedAsignatura;

    setAsignaturas(newAsignaturas);
    setEditAsignaturaId(null);
  };

  const handleEditClick = (event, asignatura) => {
    event.preventDefault();
    setEditAsignaturaId(asignatura.id);

    const formValues = {
      plan: asignatura.plan,
      area: asignatura.area,
      codigo: asignatura.codigo,
      nombre: asignatura.nombre,
      curso: asignatura.curso,
      periodo: asignatura.periodo,
      horas_estud1: asignatura.horas_estud1,
      horas_estud2: asignatura.horas_estud2,
      horas_estud3: asignatura.horas_estud3,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditAsignaturaId(null);
  };

  const handleDeleteClick = (asignaturaId) => {
    const newAsignaturas = [...asignaturas];

    const index = asignaturas.findIndex((asignatura) => asignatura.id === asignaturaId);

    newAsignaturas.splice(index, 1);

    setAsignaturas(newAsignaturas);
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
                <Link to="/importar-asignaturas"><button id="buttonselect" type="button" >IMPORTAR ASIGNATURAS</button></Link>
                <Link to="/listar-asignaturas"><button id="buttonselect" type="button" >LISTAR ASIGNATURAS</button></Link>
                <Link to="/seleccion-horario-grados"><button id="buttonselect" type="button">EDITAR HORARIOS</button></Link>
            </ButtonGroup>

    </div>
    
  );
};

export default PantallaHorarios;
