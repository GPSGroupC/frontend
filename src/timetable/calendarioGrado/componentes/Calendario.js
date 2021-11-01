import React, {Component, useLayoutEffect} from 'react';
const { datesGenerator } = require('dates-generator');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

class Calendario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            dates:[],
            calendar: { month: new Date().getMonth(), year: new Date().getFullYear() },
        }
    }

    useEffect = () => {
        const body = {
            month: this.state.calendar.month,
            year: this.state.calendar.year,
        }
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body)
        this.setState({dates: dates})
        this.setState({ calendar: { month: this.state.calendar.month, year: this.state.calendar.year, nextMonth, nextYear, previousMonth, previousYear} } )
    }

    onClickNext = () => {
        const body = {
            month: this.state.calendar.nextMonth,
            year: this.state.calendar.nextYear,
        }
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body)
        this.setState( {dates: dates} )
        this.setState({ calendar: { month: this.state.calendar.nextMonth, year: this.state.calendar.nextYear, nextMonth, nextYear, previousMonth, previousYear} } )

    }

    onClickPrevious = () => {
        const body = {
            month: this.state.calendar.previousMonth,
            year: this.state.calendar.previousYear,
        }
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body)
        this.setState( {dates: dates} )
        this.setState({ calendar: { month: this.state.calendar.previousMonth, year: this.state.calendar.previousYear, nextMonth, nextYear, previousMonth, previousYear} } )

    }

    onSelectDate = (date) => {
        this.setState((state, props) => ({
            selectedDate: date,
        }))
        console.log(this.state.selectedDate)

    }
    render() {
        return (<div style={{ width: '100%', paddingTop: 50 }}>
                    <div style={{ padding: 10 }}>
                        <div onClick={this.onClickPrevious} style={{ float: 'left', width: '50%' }}>
                            Anterior
                        </div>
                        <div onClick={this.onClickNext} style={{ float: 'left', width: '50%', textAlign: 'right' }}>
                            Siguiente
                        </div>
                    </div>
                        {months[this.state.calendar.month]}
                    <div>

                        <div>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                <tr>
                                    {days.map((day) => (
                                        <td key={day} style={{ padding: '5px 0' }}>
                                            <div style={{ textAlign: 'center', padding: '5px 0' }}>
                                                {day}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {this.state.dates.length > 0 && this.state.dates.map((week) => (
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
                            </table>
                        </div>

                    </div>
                    <div style={{ padding: 10 }}>
                        Fecha seleccionada: {this.state.selectedDate.toLocaleString()}
                    </div>
            </div>
        );
    }
}

export default Calendario;