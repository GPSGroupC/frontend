import axios from "axios";
import Parser from "../utils/Parser";

const baseUrl = "https://timetableeina-back.herokuapp.com"
const localHostURL = "http://localhost:8000"

class Api {
    static getAllCalendarData = async (curso) => {
        console.log("getAllCalendarData: " +  curso)
        let dateIC1 = null,dateIC2 = null,dateIS1 = null, ultMod = null
        await axios({ method: 'GET', url: baseUrl + "/calendar/getCalendar",
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

    static putAllCalendarData = async(inicio1, inicio2, inicio3, course) => {
        axios({ method: 'POST', url: baseUrl + "/calendar/updateCalendar",
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
            var dayList = Parser.semesterToListChangedDate(semester)
            //PUT to backend ENDPOINT /calendar/updateSemester
            axios({ method: 'PUT', url: localHostURL + "/calendar/updateSemester",
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