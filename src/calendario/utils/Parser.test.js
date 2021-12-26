import Parser from './Parser';
import constants from "./Constants";

// ParseFestivos
it('Dada una lista de semanas, actualiza como festivos los Sabados y Domingos', () => {
    var dates = [
            [ //semana
                {date: 1, month: 2, year: 2021}, // Lunes
                {date: 2, month: 2, year: 2021}, // Martes
                {date: 3, month: 2, year: 2021}, // Miercoles
                {date: 4, month: 2, year: 2021}, // Jueves
                {date: 5, month: 2, year: 2021}, // Viernes
                {date: 6, month: 2, year: 2021}, // Sabado
                {date: 7, month: 2, year: 2021}, // Domingo
            ]
    ]
    Parser.parseFestivos(dates)
    for ( let i = 0; i < 5; i++) { // Lunes a Viernes
        expect(dates[0][i].type).not.toEqual("festivo")
    }
    expect(dates[0][5].type).toEqual("festivo") // Sabado
    expect(dates[0][5].type).toEqual("festivo") // Domingo
});

// ParseFestivos
it('Dada una lista de semanas, no actualiza festivos con fechas incorrectas', () => {
    var dates = [
        [ //semana
            {date: 1, month: 2, year: 2021},
            {date: 2, month: 2, year: 2021},
            {date: 3, month: 2, year: 2021},
            {date: 4, month: 2, year: 2021},
            {date: 5, month: 2, year: 2021},
            {date: ' ', month: 2, year: 2021}, // Sabado, formato incorrecto
            {date: 7, month: 2, year: 2021},
        ]
    ]
    Parser.parseFestivos(dates)

    expect(dates[0][5].type).not.toEqual("festivo") // Domingo
});

it('Los objetos fecha se formatean correctamente para mostrarlos en el calendario', () => {
    var festivo = { date: "1", type: constants.TIPOS_FECHA.FESTIVO} // Dia festivo
    var convocatoria = { date: "1", type: constants.TIPOS_FECHA.CONVOCATORIA} // Dia convocatoria
    var lectivo = { date: "1", type: constants.TIPOS_FECHA.LECTIVO} // Dia lectivo
    var lectivoSemA = { date: 1, type: constants.TIPOS_FECHA.LECTIVO, semanaAB: 'a' } // Dia lectivo en semana a
    var lectivoSemAhorarioCambiado = { date: 1, type: "lectivo", semanaAB: 'a', horarioCambiado:'M' } //Dia lectivo en semana a con horario cambiado
    var lectivoHorarioCambiado = { date: 1, type: "lectivo", horarioCambiado:'M' } //Dia lectivo con horario cambiado

    expect(Parser.showCalendarDate(festivo, 'L' )).toEqual("1")
    expect(Parser.showCalendarDate(convocatoria, 'L' )).toEqual("1")
    expect(Parser.showCalendarDate(lectivo, 'L' )).toEqual("1")
    expect(Parser.showCalendarDate(lectivoSemA, 'L' )).toEqual("1 La")
    expect(Parser.showCalendarDate(lectivoSemAhorarioCambiado, 'L' )).toEqual("1 Ma")
    expect(Parser.showCalendarDate(lectivoHorarioCambiado, 'L' )).toEqual("1 M")
});

it('Transforma un semestre a JSON', () => {

    var semester = {
        dates: [ //Lista de objetos fecha
                        {date: 1, month: 0, year: 2021, type: constants.TIPOS_FECHA.LECTIVO},

                ],
    }
    var semesterJSON = [ //Lista de fechas en formato JSON
        JSON.stringify({date:"1/1/2021", type: constants.TIPOS_FECHA.LECTIVO, horarioCambiado: null, semanaAB: "c"})
    ]

    expect(Parser.semesterToJSON(semester)).toEqual(semesterJSON)
});

it('Convierte un objeto fecha a string', () => {
    var date = new Date("January 1, 2021")

    expect(Parser.dateToString(date)).toEqual("1/1/2021")
});

it('Devuelve el numero de dia correspondiente al dia de la semana', () => {
    //Caso la fecha es un Lunes
    expect(Parser.devolverDiaSemana(20,11,2021)).toEqual(1)
    //Caso el dia introducido es incorrecto
    expect(Parser.devolverDiaSemana(Parser.BLANK_DATE,11,2021)).toEqual(undefined)

});

it('Devuelve true cuando una semana es vacia', () => {
    var emptyWeek = [
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: Parser.BLANK_DATE, month: 2, year: 2021}
    ]

    var nonEmptyWeek = [
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: Parser.BLANK_DATE, month: 2, year: 2021},
        {date: 5, month: 2, year: 2021},
        {date: 6, month: 2, year: 2021},
        {date: 7, month: 2, year: 2021},
        {date: 8, month: 2, year: 2021}
    ]

    expect(Parser.weekIsBlank(emptyWeek)).toEqual(true)
    expect(Parser.weekIsBlank(nonEmptyWeek)).toEqual(false)

});

it('Parsea el id de un selector HTML de semana A/B devolviendo el numero de semana', () => {
    //Selector de semana a/b de la primera semana del tercer mes
    expect(Parser.getNumWeekFromId("globalWeekSelectorAB-2-0")).toEqual(0)
    //Selector con id incorrecto
    expect(Parser.getNumWeekFromId("globalWeekSelectorAB-MONTHINDEX-WEEKINDEX")).toEqual(-1)
});

it('Parsea el id de un selector HTML de semana A/B devolviendo el numero de mes', () => {
    //Selector de semana a/b de la primera semana del tercer mes
    expect(Parser.getNumMonthFromId("globalWeekSelectorAB-2-0")).toEqual(2)
    //Selector con id incorrecto
    expect(Parser.getNumMonthFromId("globalWeekSelectorAB-MONTHINDEX-WEEKINDEX")).toEqual(-1)
});
