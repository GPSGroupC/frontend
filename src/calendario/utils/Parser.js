import constants from "./Constants";

class Parser {
    static BLANK_DATE = ' ';
    /**
     * Recibe una lista de semanas con formato: [ semana[ dia {} ] ]
     * Asigna el tipo 'festivo' a los Sabados y Domingos
     */
    static parseFestivos(month) {
        month.map( (week) => {
            week.map( (day, dayIndex) => {
                if ( (dayIndex == 5 || dayIndex == 6) && day.date !== this.BLANK_DATE) {
                    day.type = "festivo"
                }
            })
        })
    }

    /**
     * Devuelve un string correspondiente a la fecha formateada segun su tipo para
     * ser mostrada en la interfaz del calendario.
     * @param {Object} date Fecha a formatear
     * @param dayOfWeek     Letra correspondiente al dia de la semana de `date`
     * @param TIPOS_FECHA     Tipos de fechas posibles
     */
    static showCalendarDate(date, dayOfWeek) {
        if (date.type === constants.TIPOS_FECHA.LECTIVO && date.semanaAB != undefined && date.horarioCambiado != undefined) {
            //Fecha lectiva con semana a/b y horario cambiado
            return date.date + " " + date.horarioCambiado + date.semanaAB
        } else if (date.type === constants.TIPOS_FECHA.LECTIVO && date.semanaAB != undefined && date.horarioCambiado == undefined) {
            //Fecha lectiva con semana a/b
            return  date.date + " " + dayOfWeek + date.semanaAB
        } else if (date.type === constants.TIPOS_FECHA.LECTIVO && date.semanaAB == undefined && date.horarioCambiado != undefined) {
            //Fecha lectiva con horario cambiado
            return date.date + " " + date.horarioCambiado
        } else {
            //Fecha lectiva/convocatoria/festiva
            return date.date
        }
    }

    /**
     * @Description Esta funcion se utiliza como función auxiliar para renderizar o no renderizar 
     * los días previos a la fecha de inicio del primer cuatrismestre.
     * 
     * @param {Fecha con la que se quiere comparar la fecha actual, formato Date DD/MM/YYYY} startSemester1
     * @param {Fecha actual en formato Date DD/MM/YYYY} currentDate 
     * @returns Devuelve verdad si y solo si la fecha currentDate es anterior a startSemester1
     */
    static isPreviousDate(startSemester1, currentDate){
        const splittedSemester1 = startSemester1.split('/')
        const splittedCurrentDate = currentDate.split('/')
   
        return (parseInt(splittedCurrentDate[2]) <= parseInt(splittedSemester1[2])
        &&  parseInt(splittedCurrentDate[1]) <= parseInt(splittedSemester1[1]) 
        && parseInt(splittedCurrentDate[0]) < parseInt(splittedSemester1[0]));
    }

    static ParseDaysBeforeSemester1Beginning(startDateSemester1,currentDate,diaSemestre){
        if(this.isPreviousDate(startDateSemester1,currentDate)){
            diaSemestre.date = this.BLANK_DATE
            diaSemestre.type = undefined
        }
    }

    static async ParseDate(semester,fechasCuatri,inicioPrimerCuatri) {
        semester.map( week => {
            week.map((day) => {
               // console.log(day,inicioPrimerCuatri)
                const specificDay = day.jsDate.split(this.BLANK_DATE)[0]
                if( !isNaN(inicioPrimerCuatri)){
                  this.ParseDaysBeforeSemester1Beginning(this.dateToString(new Date(inicioPrimerCuatri)),specificDay,day)
                }

                for(let i = 0; i < fechasCuatri.length; i++) {
                    let diaencontrado = fechasCuatri[i].find( dia =>
                        dia.diafecha === specificDay
                    )
                    if(diaencontrado !== undefined && day.date !== this.BLANK_DATE){
                        day.type = diaencontrado.docencia
                        day.horarioCambiado = diaencontrado.horariocambiado
                        if(diaencontrado.semana_a_b !== 'c'){
                            day.semanaAB = diaencontrado.semana_a_b
                        }
                    }
                }
            })
        })
      
       
    }

    /**
     *
     * Recibe una lista de meses con formato: [ mes[ semana[ dia {} ] ]
     * Devuelve una lista de fechas en formato JSON
     */
    static semesterToJSON(semester) {
        var listDays = []
      
        semester.dates.map((day) => {
            var dayFormatted = Object()
            dayFormatted.date = day.date + "/" + ((day.month) + 1) + "/" +day.year
            dayFormatted.type = day.type ? day.type : "lectivo"
            dayFormatted.horarioCambiado = day.horarioCambiado ? day.horarioCambiado : null
            dayFormatted.semanaAB = day.semanaAB ? day.semanaAB : "c"
            listDays.push(JSON.stringify(dayFormatted));
        })
        return listDays;
    }

    /**
     *
     * @param {Fecha a construir en el formato DD MM YYYY , el separador por defecto es el carácter '/' 
     * si no se proporciona otro} date
     * @param {Separador que indica como se quieren separar las fechas, por defecto '/'} separator
     * 
     * @returns {Devuelve el string correspondiente a un objecto fecha separado por el carácter 'separator'}
     */
    static dateToString(date, separator='/') {
        if (date) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}${separator}${month}${separator}${year}`
        }
        return ''
    }

    /**
     * @Description {Devuelve el numero de día dentro de la semana:
     *  donde:
     *      Domingo:   0 
     *      Lunes:     1 
     *      Martes:    2 
     *      Miercoles: 3 
     *      Jueves:    4  
     *      Viernes:   5 
     *      Sábado:    6
     * }
     * 
     * @param {Dia proporcionado} dia 
     * @param {Mes proporcionado} mes , rango 0-11
     * @param {Año proporcionado} anyo 
     * @returns {Devuelve el número de día dentro de la semana de una determinada fecha}
     * 
     */
    static devolverDiaSemana(dia , mes, anyo) {
        if(dia !== this.BLANK_DATE){
            let date = new Date(anyo,mes,dia)
            return date.getDay()
        }
    }

    /**
     * @param {Objeto del tipo semana usando en nuestro calendario} week
     * @returns {Devuelve true si week es una semana vacia}
     */
    static weekIsBlank(week) {
        var result = true //Por defecto es vacia
        week.map((day) => {
            if (day.date !== this.BLANK_DATE) {
                result = false
            }
        })
        return result
    }

    /**
     * Todos los selectores html de semana a/B tienen el id:
     *      "globalWeekSelectorAB-${monthIndex}-${weekIndex}"
     * monthIndex := Indice numerico del mes correspondiente al selector
     * weekIndex := Indice numerico de la semana correspondiente al selector
     *
     * Devuelve weekIndex. Si este es incorrecto devuelve -1
     */
    static getNumWeekFromId(id) {
        var parts = id.split('-')
        var numWeek =  parts[2]
        if (!isNaN(numWeek)) {
            return parseInt(numWeek,10)
        }
        return -1
    }

    /**
     * Todos los selectores html de semana a/B tienen el id:
     *      "globalWeekSelectorAB-${monthIndex}-${weekIndex}"
     * monthIndex := Indice numerico del mes correspondiente al selector
     * weekIndex := Indice numerico de la semana correspondiente al selector
     *
     * Devuelve monthIndex. Si este es incorrecto devuelve -1
     */
    static getNumMonthFromId(id) {
        var parts = id.split('-')
        var numMonth =  parts[1]
        if (!isNaN(numMonth)) {
            return parseInt(numMonth,10)
        }
        return -1
    }
}



export default Parser;