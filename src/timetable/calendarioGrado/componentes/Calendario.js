import React, {Component, useLayoutEffect} from 'react';
const { datesGenerator } = require('dates-generator');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

class Calendario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            semestre1:{dates: [], year: -1},
            semestre2:{dates: [], year: -1},
            recuperacion:{dates: [], year: -1}
        }
    }

    /* Dada una fecha inicial y una duración, devuelve un periodo en formato:
    *  periodo := { dates: [ mes ], year }
    *  mes:= [ semana ]
    *  semana:= [ {dia} ]
    */
    getPeriodo = (firstDate, numMonths) => {
        let date = firstDate
        let datesPeriodo = []
        for (let i = 0; i < numMonths; i++) {
            // dates -> mes[ semana[ {dia} ] ]
            const { dates, nextMonth, nextYear } = datesGenerator(date)
            datesPeriodo = [...datesPeriodo,dates]
            date = {month: nextMonth, year: nextYear}
        }
        //periodo[ mes[ semana[ {dia} ] ] ]
        return { dates: datesPeriodo, year: firstDate.year}
    }

    //Detectar que se ha pulsado una fecha
    onSelectDate = (date) => {
        this.setState((state, props) => ({
            selectedDate: date,
        }))
        console.log(this.state.selectedDate)

    }

    //Inicializar información
    componentDidMount() {
        this.state.semestre1 = this.getPeriodo({ month: 9, year: 2021 }, 5)
        this.state.semestre2 = this.getPeriodo({ month: 2, year: 2022 }, 5)
        this.state.recuperacion = this.getPeriodo({ month: 9, year: 2022 }, 1)

        this.setState((state, props) => ({}))
    }

    //Tabla html para cada periodo del calendario
    htmlTable(periodo) {
        return (
            <table style={{ width: '100%' }}>
                <thead>
                <tr>
                    <td>{periodo.year}</td>
                    {days.map((day) => (
                        <td key={day} style={{ padding: '5px 0' }}>
                            <div style={{ textAlign: 'center', padding: '5px 0' }}>
                                {day}
                            </div>
                        </td>
                    ))}
                </tr>
                </thead>
                {periodo.dates.length > 0 && periodo.dates.map((month) => (

                    <tbody>
                    <tr>
                        <td rowSpan={month.length + 1} scope="rowgroup">
                            {months[month[0][0].month]}
                        </td>
                    </tr>
                    {month.length > 0 && month.map((week) => (
                        <tr key={JSON.stringify(week[0])}>
                            {week.map((each) => (
                                <td key={JSON.stringify(each)} style={{ padding: '5px 0' }}>
                                    <div onClick={() => this.onSelectDate(each.jsDate)} style={{ textAlign: 'center', padding: '5px 0' }}>
                                        {each.date}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                ))}
            </table>
        )
    }

    render() {
        return (<div style={{ width: '100%', paddingTop: 50 }}>
                <div style={{ padding: 10 }}>
                    Fecha seleccionada: {this.state.selectedDate.toLocaleString()}
                </div>
                <h1>Primer semestre</h1>
                {this.htmlTable(this.state.semestre1)}
                <h1>Segundo semestre</h1>
                {this.htmlTable(this.state.semestre2)}
                <h1>Período exámenes 2ª convocatoria</h1>
                {this.htmlTable(this.state.recuperacion)}
            </div>
        );
    }
}

export default Calendario;