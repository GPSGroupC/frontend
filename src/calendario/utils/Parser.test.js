import Parser from './Parser';

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
it('Dada una lista de semanas, no actualiza el Sabado como festivo', () => {
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