import axios from "axios";
import Parser from "../utils/Parser";

const baseUrl = "https://timetableeina-back.herokuapp.com"

class Api {
    static getAllCalendarData = async (curso) => {
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
        console.log(dateIC1,"\n", dateIC2,"\n", dateIS1,"\n", ultMod)
        return [dateIC1, dateIC2, dateIS1, ultMod]
    }

    static putAllCalendarData = async(inicio1, inicio2, inicio3, course, lastUpdate) => {
        console.log("PUT: " + inicio1)
        axios({ method: 'POST', url: baseUrl + "/calendar/updateCalendar",
            data: {
                fecha_inicio_1: inicio1,
                fecha_inicio_2: inicio2,
                convSeptiembre: inicio3,
                course: course,
                lastUpdate: lastUpdate
            }})
            .then( () => {
                console.log("Exito en el envio");
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default Api