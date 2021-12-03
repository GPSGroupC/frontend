import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnly";
import FilaEditable from "./componentes/FilaEditable";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'

function ListarAsignaturas() {

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
              <Link to="/">
                  <button type="button" className="btn btn-info btn-lg" style={{"margin-left": "750px", "margin-top":"15px"}}>SALIR SIN GUARDAR</button>
              </Link>
              <hr size="5px" color="black" />
            </div> <br></br>

            <div className="filtro2">
                <h4 className="titulo">LISTAR ASIGNATURAS</h4>
            </div>

            <div style={{"margin-left": "30%", marginRight:'30%'}} >  
                <Link to="/importar-asignaturas"><button type="button" class="btn btn-outline-info">IMPORTAR ASIGNATURAS</button></Link>
                <Link to="/listar-asignaturas"><button type="button" class="btn btn-info btn-md">LISTAR ASIGNATURAS</button></Link>
                <Link to="/seleccion-horario-grados"><button type="button" class="btn btn-outline-info">EDITAR HORARIOS</button></Link>
            </div> <br></br>


        
            <div style={{
                    display: "block",
                    margin: "auto",
                    width: "50%",
                    border: "1px solid #b8b894",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "4px 5px 4px -3px rgba(97,97,97,1)"
          }}>

          <p style={{fontWeight:'bold'}}>Añadir Asignatura</p>
          <form onSubmit={handleAddFormSubmit}>
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="plan"
              required="required"
              placeholder="Plan"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="area"
              required="required"
              placeholder="Área"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="codigo"
              required="required"
              placeholder="Código"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="nombre"
              required="required"
              placeholder="Nombre"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="curso"
              required="required"
              placeholder="Curso"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="periodo"
              required="required"
              placeholder="Período"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="horas_estud1"
              required="required"
              placeholder="Horas estud1"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="horas_estud2"
              required="required"
              placeholder="Horas estud2"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              name="horas_estud3"
              required="required"
              placeholder="Horas estud2"
              onChange={handleAddFormChange}
              />
              
              <br></br>
              <button type="submit" class="btn btn-info btn-md" style={{width: "150px", marginTop:'5px', marginLeft:'40%'}}>Añadir </button>
          </form>

        </div>


        

        <div className="horarioTabla">

        <form onSubmit={handleEditFormSubmit}>
        <table class="table table-hover">
            <thead>
                <tr class="table-light">
                    <th scope="col">Plan</th>
                    <th scope="col">Área</th>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Curso</th>
                    <th scope="col">Período</th>
                    <th scope="col">Horas estud1</th>
                    <th scope="col">Horas estud2</th>
                    <th scope="col">Horas estud3</th>
                    <th scope="col">Acciones</th>
                </tr>              
            </thead>

            <tbody>
                {asignaturas.map((asignatura) => (
                <Fragment>
                    {editAsignaturaId === asignatura.id ? (
                    <FilaEditable
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                    />
                    ) : (
                    <FilaReadOnly
                        asignatura={asignatura}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                    )}
                </Fragment>
                ))}
            </tbody>
            </table>
        </form>

      </div>
    </div>
  );
};

export default ListarAsignaturas;
