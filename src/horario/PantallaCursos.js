import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import FilaReadOnly from "./componentes/FilaReadOnlyCursos";
import FilaEditable from "./componentes/FilaEditableCursos.js";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import Api from "./servicios/api";
import "./PantallaCursos.css";


function PantallaCursos() {

  const [cursos, setCursos] = useState(data);
  const [addFormData, setAddFormData] = useState({
    grupo: "",
    nombre: "",
    curso: "",
    turno: "",
    semestre: "",
  });

  const [editFormData, setEditFormData] = useState({
    grupo: "",
    nombre: "",
    curso: "",
    turno: "",
    semestre: "",
  });

  const [editCursoId, setEditCursoId] = useState(null);

  /*async function obtenerAsignaturas() {
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
      document.getElementById("codplan").value = "";
      document.getElementById("plan").value = "";
      document.getElementById("area").value = "";
      document.getElementById("codasig").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("curso").value = "";
      document.getElementById("periodo").value = "";
      document.getElementById("horasestteoria").value = "";
      document.getElementById("horasestproblemas").value = "";
      document.getElementById("horasestpracticas").value = "";
      document.getElementById("destvinculo").value = "";
      window.alert("Asignatura añadida con éxito");
      obtenerAsignaturas();
    }).catch(err => {
      console.log("Error al añadir asignatura: ", err)
    })
  }

  async function añadirAsignaturas(formdata) {
    await Api.añadirAsignaturas(formdata).then(r => {
      console.log(r);
      if (r.status === 200) {
        document.getElementById("file").value = "";
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
    const answer = window.confirm("No te preocupes, no perderás ninguno de los cursos almacenados previamente ¿Añadir cursos?");
    if (answer) {
      const formdata = new FormData()
      formdata.append('file', e.target[0].files[0]);
      añadirCursos(formdata);
    } else {

    }
  };*/

  const handleSubmit = (e) => { /*No hacemos nada por el momento */ }

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

    const newCurso = {
        id: nanoid(),
        grupo: addFormData.grupo,
        nombre: addFormData.nombre,
        curso: addFormData.curso,
        turno: addFormData.turno,
        semestre: addFormData.semestre
    };

    const newCursos = [...cursos, newCurso];
    setCursos(newCursos);

    //añadirCursos(cursoObj);

  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCurso = {
        id: editCursoId,
        grupo: editFormData.grupo,
        nombre: editFormData.nombre,
        curso: editFormData.curso,
        turno: editFormData.turno,
        semestre: editFormData.semestre
    };
    
    const newCursos = [...cursos];
    const index = cursos.findIndex((curso) => curso.id === editCursoId);
    newCursos[index] = editedCurso;

    setCursos(newCursos);
    setEditCursoId(null);

    //setEditCursoId(null);
    //editarCurso(cursoObj);

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

  const handleEditClick = (event, curso) => {
    event.preventDefault();
    setEditCursoId(curso.id);

    const formValues = {
        grupo: curso.grupo,
        nombre: curso.nombre,
        curso: curso.curso,
        turno: curso.turno,
        semestre: curso.semestre
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditCursoId(null);
  };

  const handleDeleteClick = (cursoId) => {

    const newCursos = [...cursos];
    const index = cursos.findIndex((curso) => curso.id === cursoId);
    newCursos.splice(index, 1);
    setCursos(newCursos);

    //eliminarCurso(cursoId);

  };

  return (

    <div>
            <div style={{
                    display: "block",
                    margin: "20px auto auto",
                    width: "61%",
                    border: "1px solid #b8b894",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "4px 5px 4px -3px rgba(97,97,97,1)"
          }}>

          <h3>Añadir Curso</h3>
          <form onSubmit={handleAddFormSubmit}>
              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              min="0"
              id="grupo"
              name="grupo"
              required="required"
              placeholder="Grupo"
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
              id="curso"
              name="curso"
              required="required"
              placeholder="Curso"
              onChange={handleAddFormChange}
              />

              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="text"
              id="turno"
              name="turno"
              required="required"
              placeholder="Turno"
              onChange={handleAddFormChange}
              />

              <input style={{marginLeft: '1px', marginRight: '1px'}}
              type="number"
              min="0"
              id="semestre"
              name="semestre"
              required="required"
              placeholder="Semestre"
              onChange={handleAddFormChange}
              />
              
              
              <br></br>
              <button type="submit" class="btn btn-info btn-md" style={{width: "150px", marginTop:'10px', marginLeft:'0%'}}>Añadir </button>
          </form>
        <div>
          <br></br><br></br>
          <p style={{fontWeight:'bold'}}>Añadir cursos desde un archivo excel</p>
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

      

        <div className="tablaCursos">

        <form onSubmit={handleEditFormSubmit}>

        <table class="table table-hover">
            <thead>
                <tr class="table-light">
                    <th scope="col">Grupo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Curso</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Semestre</th>
                    <th scope="col">Acciones</th>
                </tr>              
            </thead>

            <tbody>
                {console.log(cursos)}
                {cursos.map((curso) => (
                <Fragment>
                    {editCursoId === curso.id ? (
                    <FilaEditable
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                    />
                    ) : (
                    <FilaReadOnly
                        curso={curso}
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

export default PantallaCursos;
