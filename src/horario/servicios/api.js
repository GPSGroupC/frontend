import axios from "axios";

const baseUrl = "https://timetableeina-back.herokuapp.com"
//No borreis esta URL por si hubiese que seguir testeando en el futuro con el localhost, en caso de encontrar Bugs.
const localHostURL = "http://localhost:8000"

class Api {
  static importarAsignaturas = async (formdata) => {
    console.log("importarAsignaturas");
    let result = null
    await fetch(baseUrl + "/importarAsignaturas", {
      method: 'POST',
      body: formdata
    })
      .then(res => result = res)
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
      })
    return result
  }

  static obtenerAsignaturas = async () => {
    console.log("obtenerAsignaturas");
    let result = null
    await axios({ method: 'GET', url: baseUrl + "/obtenerAsignaturas" })
      .then((response) => {
        if (response.status === 200) {
          result = response;
        }
      })
      .catch(error => {
        console.log(error);
      })
    return result
  }

  static añadirAsignatura = async (asignaturaObj) => {
    console.log("Añadir asignatura");
    let result = null
    await axios.post(baseUrl + "/anyadirAsignatura", { 
      codasig: asignaturaObj.codasig,
      nombre: asignaturaObj.nombre,
      codarea: asignaturaObj.codarea,
      codplan: asignaturaObj.codplan,
      curso: asignaturaObj.curso,
      periodo: asignaturaObj.periodo,
      horasestteoria: asignaturaObj.horasestteoria,
      horasestproblemas: asignaturaObj.horasestproblemas,
      horasestpracticas: asignaturaObj.horasestpracticas })
      .then(response => {
        result = response;
      })
      .catch(error => {
        console.log(error);
      })
      return result
  }

  static añadirAsignaturas = async (formdata) => {
    console.log("Añadir asignaturas");
    let result = null
    await fetch(baseUrl + "/anyadirAsignaturas", {
      method: 'POST',
      body: formdata
    })
      .then(res => result = res)
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
      })
    return result
  }

  static eliminarAsignatura = async (id) => {
    console.log("Eliminar asignatura con id: " + id);
    let result = null
    await axios.delete(baseUrl + "/eliminarAsignatura", {
      data: {
        id : id
      }
    }).then(response => {
      result = response;
    })
    return result
  }
  
  static editarAsignatura = async (asignaturaObj) => {
    console.log("Editar asignatura");
    let result = null
    await axios.put(baseUrl + "/editarAsignatura/" + asignaturaObj.id, { 
      codasig: asignaturaObj.codasig,
      nombre: asignaturaObj.nombre,
      codarea: asignaturaObj.codarea,
      codplan: asignaturaObj.codplan,
      curso: asignaturaObj.curso,
      periodo: asignaturaObj.periodo,
      horasestteoria: asignaturaObj.horasestteoria,
      horasestproblemas: asignaturaObj.horasestproblemas,
      horasestpracticas: asignaturaObj.horasestpracticas })
      .then(response => {
        result = response;
      })
      .catch(error => {
        console.log(error);
      })
      return result
  }
}

export default Api