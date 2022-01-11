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

  static obtenerAsignaturasHorario = async (codplan, curso, periodo) => {
    console.log("obtenerAsignaturasHorario");
    let result = null
    await axios.get(baseUrl + "/obtenerAsignaturasHorario", {
      params: {
        codplan: codplan,
        curso: curso,
        periodo: periodo
      }
    }).then(response => {
          result = response;
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
      area: asignaturaObj.area,
      codplan: asignaturaObj.codplan,
      plan: asignaturaObj.plan,
      curso: asignaturaObj.curso,
      periodo: asignaturaObj.periodo,
      horasestteoria: asignaturaObj.horasestteoria,
      horasestproblemas: asignaturaObj.horasestproblemas,
      horasestpracticas: asignaturaObj.horasestpracticas,
      destvinculo: asignaturaObj.destvinculo })
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
      area: asignaturaObj.area,
      codplan: asignaturaObj.codplan,
      plan: asignaturaObj.plan,
      curso: asignaturaObj.curso,
      periodo: asignaturaObj.periodo,
      horasestteoria: asignaturaObj.horasestteoria,
      horasestproblemas: asignaturaObj.horasestproblemas,
      horasestpracticas: asignaturaObj.horasestpracticas,
      destvinculo: asignaturaObj.destvinculo })
      .then(response => {
        result = response;
      })
      .catch(error => {
        console.log(error);
      })
      return result
  }

  static importarAulas = async (formdata) => {
    console.log("importarAulas");
    let result = null
    await fetch(baseUrl + "/importarAulas", {
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

  static obtenerAulas = async () => {
    console.log("obtenerAulas");
    let result = null
    await axios({ method: 'GET', url: baseUrl + "/obtenerAulas" })
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

  static añadirAulas = async (formdata) => {
    console.log("Añadir aulas");
    let result = null
    await fetch(baseUrl + "/anyadirAulas", {
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

  static añadirAula = async (aulaObj) => {
    console.log("Añadir aula");
    let result = null
    await axios.post(baseUrl + "/anyadirAula", { 
      acronimo: aulaObj.acronimo,
      nombre: aulaObj.nombre,
      capacidad: aulaObj.capacidad,
      edificio: aulaObj.edificio })
      .then(response => {
        result = response;
      })
      .catch(error => {
        console.log(error);
      })
      return result
  }

  static editarAula = async (aulaObj) => {
    console.log("Editar aula");
    let result = null
    await axios.put(baseUrl + "/editarAula/" + aulaObj.id, { 
      acronimo: aulaObj.acronimo,
      nombre: aulaObj.nombre,
      capacidad: aulaObj.capacidad,
      edificio: aulaObj.edificio })
      .then(response => {
        result = response;
      })
      .catch(error => {
        console.log(error);
      })
      return result
  }

  static eliminarAula = async (id) => {
    console.log("Eliminar aula con id: " + id);
    let result = null
    await axios.delete(baseUrl + "/eliminarAula", {
      data: {
        id : id
      }
    }).then(response => {
      result = response;
    })
    return result
  }

  static guardarListadoClases = async (idhorario, listadoClases) => {
    console.log(listadoClases)
    console.log("Guardar listado de clases");
    let result = null
    await axios.post(baseUrl + "/listadoClases/" + idhorario, {
        listadoClases : listadoClases
    }).then(response => {
      result = response;
    })
    return result
  }

  static obtenerListadoClases = async (idhorario) => {
    console.log("Obtener listado de clases");
    let result = null
    await axios.get(baseUrl + "/listadoClases", {
      params: {
        idhorario: idhorario
      }
    }).then(response => {
          result = response;
        })
        .catch(error => {
          console.log(error);
        })
    return result
  }

  static obtenerPlanes = async () => {
    console.log("obtenerPlanes");
    let result = null
    await axios({ method: 'GET', url: baseUrl + "/obtenerPlanes" })
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

  static añadirHorario = async (horarioObj) => {
    console.log("Añadir horario");
    let result = null
    await axios.post(baseUrl + "/anyadirHorario", { 
      codplan: horarioObj.codplan,
      curso: horarioObj.curso,
      periodo: horarioObj.periodo,
      grupo: horarioObj.grupo,
      descripcion: horarioObj.descripcion })
      .then(response => {
        result = response;
      })
      .catch(error => {
        console.log(error);
      })
      return result
  }

  static obtenerHorarios = async () => {
    console.log("obtenerHorarios");
    let result = null
    await axios({ method: 'GET', url: baseUrl + "/obtenerHorarios" })
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
}

export default Api