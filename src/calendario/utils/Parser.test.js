import Parser from './Parser';
import * as constants from "constants";

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

it('Muestra las fechas del calendario correctamente segun su tipo', () => {
    //Dia lectivo
    var date = { date: "1", type: "lectivo" }
    var showDate = Parser.showCalendarDate(date, 'L' )
    expect(showDate).toEqual("1")

    //Dia lectivo son semana a/b y horario cambiado
    date = { date: 1, type: "lectivo", semanaAB: 'a', horarioCambiado:'M' }
    showDate = Parser.showCalendarDate(date, 'L' )
    expect(showDate).toEqual("1 Ma")

    //Dia lectivo son semana a/b
    date = { date: 1, type: "lectivo", semanaAB: 'a' }
    showDate = Parser.showCalendarDate(date, 'L' )
    expect(showDate).toEqual("1 La")

    //Dia lectivo con horario cambiado
    date = { date: 1, type: "lectivo", horarioCambiado:'M' }
    showDate = Parser.showCalendarDate(date, 'L' )
    expect(showDate).toEqual("1 M")

});