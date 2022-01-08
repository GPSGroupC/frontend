import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnlyGrados";
import FilaEditable from "./componentes/FilaEditableGrados";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import Api from "./servicios/api";
import "./ListarAsignaturas.css";


function SeleccionHorarioGrados() {

  const [grados, setGrados] = useState(data);
  const [addFormData, setAddFormData] = useState({
    nombre: "",
  });

  const [editFormData, setEditFormData] = useState({
    nombre: ""
  });

  const [editGradoId, setEditGradoId] = useState(null);

  /*
  ==============================
  =====CONEXION CON BACK========
  ==============================
  
  async function obtenerGrados() {
    await Api.obtenerGrados().then(r => {
      console.log(r);
      if(!r.data.message) {
        setGrados(r.data);
      } else {
        setGrados([]);
      }
    }).catch(err => {
      console.log("Error al obtener grados: ", err)
    })
  }

  async function añadirGrado(gradoObj) {
    await Api.añadirGrado(gradoObj).then(r => {
      console.log(r);
      document.getElementById("nombre").value = "";
      window.alert("Grado añadido con éxito");
      obtenerGrados();
    }).catch(err => {
      console.log("Error al añadir Grado: ", err)
    })
  }

  async function añadirGrados(formdata) {
    await Api.añadirGrados(formdata).then(r => {
      console.log(r);
      if (r.status === 200) {
        document.getElementById("file").value = "";
        window.alert("Grados añadidos con éxito");
      } else {
        window.alert("Ha ocurrido un error al añadir los grados");
      }
      obtenerGrados();
    }).catch(err => {
      console.log("Error al añadir grados: ", err)
    })
  }

  async function eliminarGrado(idgrado) {
    await Api.eliminarGrado(idgrado).then(r => {
      console.log(r);
      obtenerGrados();
    }).catch(err => {
      console.log("Error al eliminar grado: ", err)
    })
  }

  async function editarGrado(gradoObj) {
    await Api.editarGrado(gradoObj).then(r => {
      console.log(r);
      obtenerGrados();
    }).catch(err => {
      console.log("Error al editar grado: ", err)
    })
  }

  useEffect(() => {
    obtenerGrados();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const answer = window.confirm("No te preocupes, no perderás ninguna de los grados almacenados previamente ¿Añadir grado?");
    if (answer) {
      const formdata = new FormData()
      formdata.append('file', e.target[0].files[0]);
      añadirGrados(formdata);
    } else {

    }
  };*/

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

    const newGrado = {
      id: nanoid(),
      nombre: addFormData.nombre,
    };

    const newGrados = [...grados, newGrado];
    setGrados(newGrados);

    //añadirGrado(gradoObj);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedGrado = {
      id: editGradoId,
      nombre: editFormData.nombre,
    };


    const newGrados = [...grados];
    const index = grados.findIndex((grado) => grado.id === editGradoId);
    newGrados[index] = editedGrado;

    setGrados(newGrados);
    setEditGradoId(null);
    
    //setEditGradoId(null);
    //editarGrado(gradoObj);
  };

  const handleEditClick = (event, grado) => {
    event.preventDefault();
    setEditGradoId(grado.id);

    const formValues = {
      nombre: grado.nombre,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditGradoId(null);
  };

  const handleDeleteClick = (gradoId) => {
    //eliminarGrado(gradoId);

    const newGrados = [...grados];
    const index = grados.findIndex((grado) => grado.id === gradoId);
    newGrados.splice(index, 1);
    setGrados(newGrados);
  };

  return (

    <div>
            <div style={{
                    display: "block",
                    margin: "auto",
                    width: "25%",
                    border: "1px solid #b8b894",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "4px 5px 4px -3px rgba(97,97,97,1)"
          }}>

          <h3>Añadir Grado</h3>
          <form onSubmit={handleAddFormSubmit}>
    
              <input style={{marginLeft: '1px', marginRight: '1px', width: '350px'}}
              type="text"
              id="nombre"
              name="nombre"
              required="required"
              placeholder="Nombre"
              onChange={handleAddFormChange}
              />
                            
              <br></br>
              <button type="submit" class="btn btn-info btn-md" style={{width: "150px", marginTop:'10px', marginLeft:'0%'}}>Añadir </button>
          </form>

        </div>

      

        <div className="tablaGrados">

        <form onSubmit={handleEditFormSubmit}>
        <table class="table table-hover">
            <thead>
                <tr class="table-light">
                    <th scope="col">Nombre</th>
                    <th scope="col">Acciones</th>
                </tr>              
            </thead>

            <tbody>
                {console.log(grados)}
                {grados.map((grado) => (
                <Fragment>
                    {editGradoId === grado.id ? (
                    <FilaEditable
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                    />
                    ) : (
                    <FilaReadOnly
                        grado={grado}
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

export default SeleccionHorarioGrados;
