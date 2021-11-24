class Parser {
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
     * Actualiza los fines de semana como festivos
     *
     * @param {Object} dates  lista de fechas con formato: meses[ semanas[ {fecha} ] ]
     */
    static parseFestivos(dates) {
        dates.map( (week) => {
            week.map( (day, dayIndex) => {
                if (dayIndex == 5 || dayIndex == 6) {
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
        console.log(date)
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
}

export default Parser;