import axios from "axios";
import Parser from "../utils/Parser";

const baseUrl = "http://localhost:8000"

class Api {
    static getAllCalendarData = async (curso) => {
        let dateIC1,dateIC2,dateIS1
        await axios({ method: 'GET', url: baseUrl + "/calendar/getCalendar",
            params: {
                course: curso,
            }})
            .then( (response) => {
                if(response.status !== 225){
                     dateIC1 = Parser.parseDate(response.data[0].fechainicio1.split('-'))
                     dateIC2 = Parser.parseDate(response.data[0].fechainicio2.split('-'))
                     dateIS1 = Parser.parseDate(response.data[0].fechainiciosept.split('-'))
                }
            })
            .catch(error => {
                console.log(error);
            })
        return [dateIC1, dateIC2, dateIS1]
    }

    static putAllCalendarData = async(inicio1, inicio2, inicio3, course, lastUpdate) => {
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