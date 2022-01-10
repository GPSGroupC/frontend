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
        let dateIC1 = null,dateIC2 = null,dateIS1 = null,dateFS1 = null, ultMod = null
        await axios({ method: 'GET', url: constants.BASE_SERVER_URL + "/calendar/getCalendar",
            params: {
                course: curso,
            }})
            .then( (response) => {
                if(response.status !== 225){
                     dateIC1 = Parser.parseDate(response.data[0].fechainicio1.split('-'))
                     dateIC2 = Parser.parseDate(response.data[0].fechainicio2.split('-'))
                     dateIS1 = Parser.parseDate(response.data[0].fechainiciosept.split('-'))
                     dateFS1 = Parser.parseDate(response.data[0].fechafinsept.split('-'))
                     ultMod = Parser.parseDate(response.data[0].fechaultmodificacion.split('-'))
                }
            })
            .catch(error => {
                console.log(error);
            })
        return [dateIC1, dateIC2, dateIS1, ultMod,dateFS1]
    }

    static putMetadataCalendar = async(inicio1, inicio2, inicio3,finSeptiembre, course) => {
        axios({ method: 'POST', url: constants.BASE_SERVER_URL + "/calendar/updateCalendar",
            data: {
                fecha_inicio_1: inicio1,
                fecha_inicio_2: inicio2,
                convSeptiembre: inicio3,
                finconvSeptiembre: finSeptiembre,
                course: course,
            }})
            .then( () => {
                console.log("Exito en el envio");
            })
            .catch(error => {
                console.log(error);
            })
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
           //console.log(dayList)
        }
    }
}

export default Api