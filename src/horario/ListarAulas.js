import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnlyAulas";
import FilaEditable from "./componentes/FilaEditableAulas";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import Api from "./servicios/api";
import "./ListarAulas.css";
function ListarAulas() {

  const [aulas, setAulas] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    acronimo: "",
    nombre: "",
    capacidad: "",
    edificio: ""
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    acronimo: "",
    nombre: "",
    capacidad: "",
    edificio: ""
  });

  const [editAulaId, setEditAulaId] = useState(null);

  async function obtenerAulas() {
    await Api.obtenerAulas().then(r => {
      console.log(r);
      if(!r.data.message) {
        setAulas(r.data);
      } else {
        setAulas([]);
      }
    }).catch(err => {
      console.log("Error al obtener aulas: ", err)
    })
  }

  async function añadirAula(aulaObj) {
    await Api.añadirAula(aulaObj).then(r => {
      console.log(r);
      document.getElementById("acronimo").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("capacidad").value = "";
      document.getElementById("edificio").value = "";
      window.alert("Aula añadida con éxito");
      obtenerAulas();
    }).catch(err => {
      console.log("Error al añadir Aula: ", err)
    })
  }

  async function añadirAulas(formdata) {
    await Api.añadirAulas(formdata).then(r => {
      console.log(r);
      if (r.status === 200) {
        document.getElementById("file").value = "";
        window.alert("Aulas añadidas con éxito");
      } else {
        window.alert("Ha ocurrido un error al añadir las aulas");
      }
      obtenerAulas();
    }).catch(err => {
      console.log("Error al añadir aulas: ", err)
    })
  }

  async function eliminarAula(idaula) {
    await Api.eliminarAula(idaula).then(r => {
      console.log(r);
      obtenerAulas();
    }).catch(err => {
      console.log("Error al eliminar aula: ", err)
    })
  }

  async function editarAula(aulaObj) {
    await Api.editarAula(aulaObj).then(r => {
      console.log(r);
      obtenerAulas();
    }).catch(err => {
      console.log("Error al editar aula: ", err)
    })
  }

  useEffect(() => {
    obtenerAulas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const answer = window.confirm("No te preocupes, no perderás ninguna de las aulas almacenadas previamente ¿Añadir aula?");
    if (answer) {
      const formdata = new FormData()
      formdata.append('file', e.target[0].files[0]);
      añadirAulas(formdata);
    } else {

    }
  };

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

    const aulaObj = {
      acronimo: addFormData.acronimo,
      nombre: addFormData.nombre,
      capacidad: addFormData.capacidad,
      edificio: addFormData.edificio
    };

    añadirAula(aulaObj);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const aulaObj = {
      id: editAulaId,
      id: editFormData.id,
      acronimo: editFormData.acronimo,
      nombre: editFormData.nombre,
      capacidad: editFormData.capacidad,
      edificio: editFormData.edificio
    };
    
    setEditAulaId(null);
    editarAula(aulaObj);
  };

  const handleEditClick = (event, aula) => {
    event.preventDefault();
    setEditAulaId(aula.id);

    const formValues = {
      id: aula.id,
      acronimo: aula.acronimo,
      nombre: aula.nombre,
      capacidad: aula.capacidad,
      edificio: aula.edificio,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditAulaId(null);
  };

  const handleDeleteClick = (aulaId) => {
    eliminarAula(aulaId);
  };

  return (

    <div>
            <div style={{
                    display: "block",
                    margin: "auto",
                    width: "50%",
                    border: "1px solid #b8b894",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "4px 5px 4px -3px rgba(97,97,97,1)"
          }}>

          <p style={{fontWeight:'bold'}}>Añadir Aula</p>
          <form onSubmit={handleAddFormSubmit}>
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              id="acronimo"
              name="acronimo"
              required="required"
              placeholder="Acrónimo"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              id="nombre"
              name="nombre"
              required="required"
              placeholder="Nombre"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              min="0"
              id="capacidad"
              name="capacidad"
              required="required"
              placeholder="Capacidad"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              min="0"
              id="edificio"
              name="edificio"
              required="required"
              placeholder="Edificio"
              onChange={handleAddFormChange}
              />
              
              <br></br>
              <button type="submit" class="btn btn-info btn-md" style={{width: "150px", marginTop:'10px', marginLeft:'0%'}}>Añadir </button>
          </form>
        <div>
          <br></br><br></br>
          <p style={{fontWeight:'bold'}}>Añadir aulas desde un archivo excel</p>
          <div id="fileform">
            <form onSubmit={handleSubmit}>
              <label>
                <input id="file" type="file" name="file" />
              </label>
              <input class="btn btn-info btn-md" style={{marginLeft:'2%'}} id="añadirButton" type="submit" value="Añadir" />
            </form>
          </div>
        </div>

        </div>

      

        <div className="horarioTablaAula">

        <form onSubmit={handleEditFormSubmit}>
        <table class="table table-hover">
            <thead>
                <tr class="table-light">
                    <th scope="col">Código Aula</th>
                    <th scope="col">Acrónimo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Capacidad</th>
                    <th scope="col">Edificio</th>
                    <th scope="col">Acciones</th>
                </tr>              
            </thead>

            <tbody>
                {console.log(aulas)}
                {aulas.map((aula) => (
                <Fragment>
                    {editAulaId === aula.id ? (
                    <FilaEditable
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                    />
                    ) : (
                    <FilaReadOnly
                        aula={aula}
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

export default ListarAulas;
