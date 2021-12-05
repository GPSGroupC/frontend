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
     * Actualiza los fines de semana como festivos
     *
     * @param {Object} dates  lista de fechas con formato: meses[ semanas[ {fecha} ] ]
     */
    static parseFestivos(dates) {
        dates.map( (week) => {
            week.map( (day, dayIndex) => {
                if ( (dayIndex == 5 || dayIndex == 6) && day.date !== this.BLANK_DATE) {
                    //Caso es sabado o domingo
                    day.type = "festivo"
                }
            })
        })
    }

    /**
     * Devuelve un string correspondiente a la fecha formateada segun su tipo
     * @param {Object} date Fecha a formatear
     * @param dayOfWeek     Letra correspondiente al dia de la semana de `date`
     * @param TIPOFECHA     Tipos de fechas posibles
     */
    static formatDate(date, dayOfWeek, TIPOFECHA) {
        if (date.type === TIPOFECHA.L && date.semanaAB != undefined && date.horarioCambiado != undefined) {
            //Fecha lectiva con semana a/b y horario cambiado
            return date.date + " " + date.horarioCambiado + date.semanaAB
        } else if (date.type === TIPOFECHA.L && date.semanaAB != undefined && date.horarioCambiado == undefined) {
            //Fecha lectiva con semana a/b
            return  date.date + " " + dayOfWeek + date.semanaAB
        } else if (date.type === TIPOFECHA.L && date.semanaAB == undefined && date.horarioCambiado != undefined) {
            //Fecha lectiva con horario cambiado
            return date.date + " " + date.horarioCambiado
        } else {
            //Fecha lectiva
            return date.date
        }
    }
    static semesterToList(semester) {
        var listDays = []

        semester.dates.map((month) => {
            month.map((week) => {
                week.map((day) => {
                    var dayFormatted = Object()
                    dayFormatted.date = day.date + "/" + day.month + "/" +day.year
                    dayFormatted.type = day.type ? day.type : "lectivo"
                    dayFormatted.horarioCambiado = day.horarioCambiado ? day.horarioCambiado : null
                    dayFormatted.semanaAB = day.semanaAB ? day.semanaAB : "c"
                    listDays.push(JSON.stringify(dayFormatted));
                })
            })
        })
        return listDays;
    }

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

    static semesterToListChangedDate(semester) {
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
     * @param date
     * @param separator
     * Devuelve el string correspondiente a un objecto fecha
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
     * Devuelve true sii week es una semana vacia
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
     * Parsea un string de tipo 'globalWeekSelectorAB-semestre-numWeek'
     * siendo numWeek un numero y devuelve numWeek.
     */
    static getNumWeekFromId(id) {
        var parts = id.split('-')
        var numWeek =  parts[2]
        if (!isNaN(numWeek)) {
            return parseInt(numWeek,10)
        }
        return -1
    }

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