import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnly";
import FilaEditable from "./componentes/FilaEditable";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import Api from "./servicios/api";

function ListarAsignaturas() {

  const [asignaturas, setAsignaturas] = useState(data);
  const [addFormData, setAddFormData] = useState({
    codplan: "",
    plan: "",
    area: "",
    codasig: "",
    nombre: "",
    curso: "",
    periodo: "",
    horasestteoria: "",
    horasestproblemas: "",
    horasestpracticas: "",
    destvinculo: ""
  });

  const [editFormData, setEditFormData] = useState({
    codplan: "",
    plan: "",
    area: "",
    codasig: "",
    nombre: "",
    curso: "",
    periodo: "",
    horasestteoria: "",
    horasestproblemas: "",
    horasestpracticas: "",
    destvinculo: ""
  });

  const [editAsignaturaId, setEditAsignaturaId] = useState(null);

  async function obtenerAsignaturas() {
    await Api.obtenerAsignaturas().then(r => {
      console.log(r);
      if(!r.data.message) {
        setAsignaturas(r.data);
      } else {
        setAsignaturas([]);
      }
    }).catch(err => {
      console.log("Error al obtener asignaturas: ", err)
    })
  }

  async function añadirAsignatura(asiganturaObj) {
    await Api.añadirAsignatura(asiganturaObj).then(r => {
      console.log(r);
      obtenerAsignaturas();
    }).catch(err => {
      console.log("Error al añadir asignatura: ", err)
    })
  }

  async function añadirAsignaturas(formdata) {
    await Api.añadirAsignaturas(formdata).then(r => {
      console.log(r);
      if (r.status === 200) {
        window.alert("Asignaturas añadidas con éxito");
      } else {
        window.alert("Ha ocurrido un error al añadir las asignaturas");
      }
      obtenerAsignaturas();
    }).catch(err => {
      console.log("Error al añadir asignaturas: ", err)
    })
  }

  async function eliminarAsignatura(idasig) {
    await Api.eliminarAsignatura(idasig).then(r => {
      console.log(r);
      obtenerAsignaturas();
    }).catch(err => {
      console.log("Error al eliminar asignatura: ", err)
    })
  }

  async function editarAsignatura(asignaturaObj) {
    await Api.editarAsignatura(asignaturaObj).then(r => {
      console.log(r);
      obtenerAsignaturas();
    }).catch(err => {
      console.log("Error al editar asignatura: ", err)
    })
  }

  useEffect(() => {
    obtenerAsignaturas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    const answer = window.confirm("No te preocupes, no perderás ninguna de las asignaturas almacenadas previamente ¿Añadir asignaturas?");
    if (answer) {
      const formdata = new FormData()
      formdata.append('file', e.target[0].files[0]);
      añadirAsignaturas(formdata);
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

    const asiganturaObj = {
      codplan: addFormData.codplan,
      plan: addFormData.plan,
      area: addFormData.area,
      codasig: addFormData.codasig,
      nombre: addFormData.nombre,
      curso: addFormData.curso,
      periodo: addFormData.periodo,
      horasestteoria: addFormData.horasestteoria,
      horasestproblemas: addFormData.horasestproblemas,
      horasestpracticas: addFormData.horasestpracticas,
      destvinculo: addFormData.destvinculo
    };

    añadirAsignatura(asiganturaObj);

    /*const newAsignatura = {
      id: nanoid(),
      codplan: addFormData.codplan,
      codarea: addFormData.codarea,
      codasig: addFormData.codasig,
      nombre: addFormData.nombre,
      curso: addFormData.curso,
      periodo: addFormData.periodo,
      horasestteoria: addFormData.horasestteoria,
      horasestproblemas: addFormData.horasestproblemas,
      horasestpracticas: addFormData.horasestpracticas,
    };

    const newAsignaturas = [...asignaturas, newAsignatura];
    setAsignaturas(newAsignaturas);*/
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const asiganturaObj = {
      id: editAsignaturaId,
      codplan: editFormData.codplan,
      plan: editFormData.plan,
      area: editFormData.area,
      codasig: editFormData.codasig,
      nombre: editFormData.nombre,
      curso: editFormData.curso,
      periodo: editFormData.periodo,
      horasestteoria: editFormData.horasestteoria,
      horasestproblemas: editFormData.horasestproblemas,
      horasestpracticas: editFormData.horasestpracticas,
      destvinculo: editFormData.destvinculo
    };
    
    setEditAsignaturaId(null);
    editarAsignatura(asiganturaObj);

    /*const editedAsignatura = {
      id: editAsignaturaId,
      codplan: editFormData.codplan,
      codarea: editFormData.codarea,
      codasig: editFormData.codasig,
      nombre: editFormData.nombre,
      curso: editFormData.curso,
      periodo: editFormData.periodo,
      horasestteoria: editFormData.horasestteoria,
      horasestproblemas: editFormData.horasestproblemas,
      horasestpracticas: editFormData.horasestpracticas,
     
    };

    const newAsignaturas = [...asignaturas];

    const index = asignaturas.findIndex((asignatura) => asignatura.id === editAsignaturaId);

    newAsignaturas[index] = editedAsignatura;

    setAsignaturas(newAsignaturas);
    setEditAsignaturaId(null);*/
  };

  const handleEditClick = (event, asignatura) => {
    event.preventDefault();
    setEditAsignaturaId(asignatura.id);

    const formValues = {
      codplan: asignatura.codplan,
      plan: asignatura.plan,
      area: asignatura.area,
      codasig: asignatura.codasig,
      nombre: asignatura.nombre,
      curso: asignatura.curso,
      periodo: asignatura.periodo,
      horasestteoria: asignatura.horasestteoria,
      horasestproblemas: asignatura.horasestproblemas,
      horasestpracticas: asignatura.horasestpracticas,
      destvinculo: asignatura.destvinculo,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditAsignaturaId(null);
  };

  const handleDeleteClick = (asignaturaId) => {
    //const newAsignaturas = [...asignaturas];
    eliminarAsignatura(asignaturaId);
    /*console.log(asignaturaId);
    const index = asignaturas.findIndex((asignatura) => asignatura.id === asignaturaId);
    console.log(index);

    newAsignaturas.splice(index, 1);*/

    //setAsignaturas(newAsignaturas);
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

          <p style={{fontWeight:'bold'}}>Añadir Asignatura</p>
          <form onSubmit={handleAddFormSubmit}>
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              min="0"
              name="codplan"
              required="required"
              placeholder="Código Plan"
              onChange={handleAddFormChange}
              />
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
              type="number"
              min="0"
              name="codasig"
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
              type="number"
              min="0"
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
              type="number"
              step=".001"
              min="0"
              name="horasestteoria"
              required="required"
              placeholder="Horas Estud Teoría"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              step=".001"
              min="0"
              name="horasestproblemas"
              required="required"
              placeholder="Horas Estud Problemas"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              step=".001"
              min="0"
              name="horasestpracticas"
              required="required"
              placeholder="Horas Estud Prácticas"
              onChange={handleAddFormChange}
              />
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              min="0"
              name="destvinculo"
              required="required"
              placeholder="Destino Vínculo"
              onChange={handleAddFormChange}
              />
              
              <br></br>
              <button type="submit" class="btn btn-info btn-md" style={{width: "150px", marginTop:'5px', marginLeft:'40%'}}>Añadir </button>
          </form>
        <div>
          <br></br><br></br>
          <p style={{fontWeight:'bold'}}>Añadir asignaturas desde un archivo excel</p>
          <div id="fileform">
            <form onSubmit={handleSubmit}>
              <label>
                <input type="file" name="file" />
              </label>
              <input class="btn btn-info btn-md" style={{marginLeft:'2%'}} id="añadirButton" type="submit" value="Añadir" />
            </form>
          </div>
        </div>

        </div>

      

        <div className="horarioTabla">

        <form onSubmit={handleEditFormSubmit}>
        <table class="table table-hover">
            <thead>
                <tr class="table-light">
                    <th scope="col">Código Plan</th>
                    <th scope="col">Plan</th>
                    <th scope="col">Área</th>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Curso</th>
                    <th scope="col">Período</th>
                    <th scope="col">Horas Estud Teoría</th>
                    <th scope="col">Horas Estud Problemas</th>
                    <th scope="col">Horas Estud Prácticas</th>
                    <th scope="col">Destino Vínculo</th>
                    <th scope="col">Acciones</th>
                </tr>              
            </thead>

            <tbody>
                {console.log(asignaturas)}
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
