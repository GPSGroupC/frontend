import axios from "axios";

const baseUrl = "https://timetableeina-back.herokuapp.com"
//No borreis esta URL por si hubiese que seguir testeando en el futuro con el localhost, en caso de encontrar Bugs.
const localHostURL = "http://localhost:8000"

class Api {
    static importarAsignaturas = async (formdata) => {
        console.log("importarAsignaturas: ");
        console.log(formdata);
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
}

export default Api