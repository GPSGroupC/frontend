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
     *
     * @param {String} date : Recibe un array con una fecha en formato DD-MM-YYYY
     * , donde date[2] = AÑO , date[1] = MES, date[0] = dia
     * @returns Devuelve una Date en formato YYYY-MM-DD
     */
       static parseDate = (date) => {
        //El mes se numera desde el 0, por eso (Mes=date[1]) - 1
        return new Date(date[2], date[1] - 1,date[0])
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

    static getDiasConHorarioCambiado(semester){
        let lista_dias_horario_cambiado = []
        semester.dates.map((month) => {
          month.map((week) => {
            week.map((day) =>{
                if (day.horarioCambiado) {
                    lista_dias_horario_cambiado.push(
                        day.date + "/"
                        + day.month + "/"
                        + day.year + " horario de "
                        + this.getFullDayName(day.horarioCambiado)
                    )
                }
            })
          })
        })
        return lista_dias_horario_cambiado
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

    static getFullDayName(initial) {
        switch (initial) {
            case "L": return "Lunes"
            case "M": return "Martes"
            case "X": return "Miércoles"
            case "J": return "Jueves"
            case "V": return "Viernes"
            case "S": return "Sábado"
            default: return "Domingo"
        }
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
     * 
     * @param {Fecha en cualquier formato valido del tipo Date de JavaScript} date 
     * @returns El número de la semana en el que se encuentra la fecha "date"
     */
    static getWeekNumberFromDate(date) {
        let fecha = new Date(date)
        var firstWeekday = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay() - 1;
        if (firstWeekday < 0) firstWeekday = 6;
        var offsetDate = fecha.getDate() + firstWeekday - 1;
        return Math.floor(offsetDate / 7);
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

    static showDescriptions(week) {
        let weekDescription = ""
        week.map((day) => {
            if(day.description &&
                (day.type === constants.TIPOS_FECHA.FESTIVO || day.type === constants.TIPOS_FECHA.CONVOCATORIA)) {
                weekDescription += " " + day.description
            }
        })
        return weekDescription
    }

    static weekHasFestivo(week) {
        let result = false
        week.map((day) => {
            if(day.type=== constants.TIPOS_FECHA.FESTIVO) {
                result = true
            }
        })
        return result
    }

    static weekHasConvocatoria(week) {
        let result = false
        week.map((day) => {
            if(day.type=== constants.TIPOS_FECHA.CONVOCATORIA) {
                result = true
            }
        })
        return result
    }
}



export default Parser;