import React, {Component} from 'react';
const { datesGenerator } = require('dates-generator');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

class Calendario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Periodos del calendario
            semestre1:{dates: [], year: -1, monthNames:[]},
            semestre2:{dates: [], year: -1, monthNames:[]},
            recuperacion:{dates: [], year: -1, monthNames:[]},
            //Dialogo checkbox
            showDialog: false,
            //Estado de una fecha seleccionada
            selectedDate: new Date(),
            selectedDateLectivoWeek: "C",
            selectedDateLectivoChange: "none",
        }
    }

    /* Dado un mes y año inicial, donde:
    *       month 0 -> Enero, month 11 -> Diciembre.
    *  Devuelve un periodo en formato:
    *       periodo := { dates, year, monthNames }
    *       dates:= [ mes ]
    *       mes:= [ semana ]
    *       semana:= [ {dia} ]
    */
    getPeriodo = (month, year, numMonths) => {
        //startingDay 0 -> Domingo, startingDay 6 -> Sabado
        let queryDate = {month: month, year: year, startingDay: 1}
        let acumDates = []
        let monthNames = []
        for (let i = 0; i < numMonths; i++) {
            const { dates, nextMonth, nextYear } = datesGenerator(queryDate)
            acumDates = [...acumDates,dates]
            monthNames = [...monthNames, months[queryDate.month]]
            queryDate = {month: nextMonth, year: nextYear, startingDay: 1}
        }
        return { dates: acumDates, year: year, monthNames: monthNames}
    }


    onOpenDialog = (date) => {
        //Obtener todos los checkbox
        let convocatoria = document.getElementById("convocatoria")
        let festivo = document.getElementById("festivo")
        let lectivo = document.getElementById("lectivo")

        //Deseleccionar todos los checkbox
        convocatoria.checked = false
        festivo.checked = false

        //Seleccionar los checkbox segun el estado del día seleccionado
        switch(date.type) {
            case "convocatoria":
                convocatoria.checked = true
                break;
            case "festivo":
                festivo.checked = true
                break;
            default:
                //caso lectivo
                lectivo.checked = true
                break;
        }
        this.setState((state, props) => ({
            selectedDate: date,
            showDialog: true,
        }))

    }

    onCloseDialog = () => {
        let newDateType = "lectivo"
        //Obtener los checkbox
        let convocatoria = document.getElementById("convocatoria")
        let festivo = document.getElementById("festivo")

        if (convocatoria.checked) {
            newDateType = "convocatoria"
        } else if (festivo.checked) {
            newDateType = "festivo"
        }
        this.state.selectedDate.type = newDateType
        this.setState((state, props) => ({
            showDialog: false,
        }))
    }

    onSelectedCheckBox = (id) => {
        let convocatoria = document.getElementById("convocatoria")
        let festivo = document.getElementById("festivo")
        let lectivo = document.getElementById("lectivo")
        switch (id) {
            case "convocatoria":
                if (convocatoria.checked) {
                    festivo.checked = false
                    lectivo.checked = false
                }
                break;
            case "festivo":
                if (festivo.checked) {
                    convocatoria.checked = false
                    lectivo.checked = false
                }
            case "lectivo":
                if (lectivo.checked) {
                    convocatoria.checked = false
                    festivo.checked = false
                }
            }
    }
    //Inicializar información
    componentDidMount() {
        //month 0 -> Enero, month 11 -> Diciembre
        this.state.semestre1 = this.getPeriodo(8, 2021, 5)
        this.state.semestre2 = this.getPeriodo( 1, 2022 , 5)
        this.state.recuperacion = this.getPeriodo( 8, 2022 , 1)

        this.setState((state, props) => ({}))
    }

    htmlDialog() {
        return (
            <dialog id="dialog" open={this.state.showDialog ? true : false}>
                <label><input type="checkbox" id="convocatoria" onChange={() => {this.onSelectedCheckBox("convocatoria")}}></input>Convocatoria</label><br/>
                <label><input type="checkbox" id="festivo" onChange={() => {this.onSelectedCheckBox("festivo")}}></input>Festivo</label><br/>
                <label><input type="checkbox" id="lectivo" onChange={() => {this.onSelectedCheckBox("lectivo")}}></input>Lectivo</label><br/>
                <button className="btn btn-info" id="closeDialog" onClick={() => this.onCloseDialog()}>Cerrar</button>
            </dialog>
        )
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
                {periodo.dates.length > 0 && periodo.dates.map((month,monthIndex) => (

                    <tbody>
                    <tr>
                        <td rowSpan={month.length + 1} scope="rowgroup">
                            {periodo.monthNames[monthIndex]}
                        </td>
                    </tr>
                    {month.length > 0 && month.map((week) => (
                        <tr key={JSON.stringify(week[0])}>
                            {week.map((day) => (
                                <td key={JSON.stringify(day)} class={day.type} style={{ padding: '5px 0' }}>
                                    <div onClick={() => this.onOpenDialog(day)} style={{ textAlign: 'center', padding: '5px 0' }}>
                                        {day.date}
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
                    Fecha seleccionada: {this.state.selectedDate.jsDate}
                </div>
                {this.htmlDialog()}
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