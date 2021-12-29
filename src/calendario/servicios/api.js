import axios from "axios";
import Parser from "../utils/Parser";
import constants from '../utils/Constants'


/**
 * Contiene los métodos para encapsular las llamadas al backend de la Aplicación
 * 
 * @Module API
 */
class Api {
    /**
     * Obtiene del backend las fechas de inicio de los tres periodos del calendario y la fecha de ultima modificacion.
     * @param curso Formato: "2021-2022"
     */
    static getMetadataCalendar = async (curso) => {
        console.log("getAllCalendarData: " +  curso)
        let dateIC1 = null,dateIC2 = null,dateIS1 = null, ultMod = null
        await axios({ method: 'GET', url: constants.BASE_SERVER_URL + "/calendar/getCalendar",
            params: {
                course: curso,
            }})
            .then( (response) => {
                if(response.status !== 225){
                     dateIC1 = Parser.parseDate(response.data[0].fechainicio1.split('-'))
                     dateIC2 = Parser.parseDate(response.data[0].fechainicio2.split('-'))
                     dateIS1 = Parser.parseDate(response.data[0].fechainiciosept.split('-'))
                    ultMod = Parser.parseDate(response.data[0].fechaultmodificacion.split('-'))
                }
            })
            .catch(error => {
                console.log(error);
            })
        return [dateIC1, dateIC2, dateIS1, ultMod]
    }

    /**
     * Obtiene del backend todas las fechas correspondientes a un curso y un semestre concreto.
     * @param curso Formato: "2021-2022"
     * @param semestre [ "semestre1" | "semestre2" | "recuperacion" ]
     * @returns {Promise<*[]>}
     */
    static getDaysCalendar = async (curso, semestre) => {
       
        let respuesta = null
        await axios({ method: 'GET', url: constants.BASE_SERVER_URL + "/calendar/getDaysCalendar",
            params: {
                cursoCalendario: curso,
                semesterName: semestre
            }})
            .then( (response) => {
                respuesta = response.data.message
            })
            .catch(error => {
                console.log(error);
            })
        return [respuesta]
    }

    static getDescriptions = async(curso, semestre) => {
        /* GET RESPONSE esperado :D
         * descriptions: [
         *    {
         *      monthIndex: 0,
         *      weekIndex: 1,
         *      text: "del 11 al 13/10/21: Festividad del Pilar"
         *    }
         * ]
         */

        let response = null //Respuesta recibida en JSON
        let descriptions = [] //Lista poblada con 'response'
        //TODO(Fer):Hacer la peticion con axios

       /* TODO(Fer): Descomentar codigo. NO ESTA PROBADO
        * Lo que hace es poblar "descriptions" como una lista de listas
        *
        * response.map((description) =>{
        *    descriptions[description.monthIndex][description.weekIndex] = description.text
        * })
        */
        return descriptions
    }

    static putDescriptions = async (curso, semestre, descriptions) => {
        var descriptionsJSON = []
        /* TODO(Fer): Descomentar codigo. NO ESTA PROBADO
        * A partir de la lista de listas 'descriptions', pobla la lista 'descriptionsJSON
        * con las descripciones semanales en formato JSON.
        *
        * descriptions.map((month, monthIndex) =>{
        *    month.map((description, weekIndex) =>{
        *       descriptionsJSON.push(
        *           {
        *                monthIndex: monthIndex,
        *                weekIndex: weekIndex,
        *                text: description.text
        *           }
        *       )
        *    })
        * })
        */
        //TODO(Fer):Hacer la peticion con axios
        /*
         * ...
         *  data: {
         *       curso: curso,
         *       semestre: semestre,
         *       descriptions: descriptionsJSON
         *   }})
         * ...
         */
    }
    static putAllCalendarData = async(inicio1, inicio2, inicio3, course) => {
        axios({ method: 'POST', url: constants.BASE_SERVER_URL + "/calendar/updateCalendar",
            data: {
                fecha_inicio_1: inicio1,
                fecha_inicio_2: inicio2,
                convSeptiembre: inicio3,
                course: course,
            }})
            .then( () => {
                console.log("Exito en el envio");
            })
            .catch(error => {
                console.log(error);
            })
    }

    static putSemester = async(course, semesterName, semester) => {
        //console.log("putSemester",course," ", semesterName," ", semester)
        if(semester.dates.length > 0) {
            var dayList = Parser.semesterToJSON(semester)
            //PUT to backend ENDPOINT /calendar/updateSemester
            axios({ method: 'PUT', url: constants.BASE_SERVER_URL + "/calendar/updateSemester",
                data: {
                    course: course,
                    semesterName: semesterName,
                    semester: dayList,
                }
            })
            console.log(dayList)
        }
    }
}

export default Api