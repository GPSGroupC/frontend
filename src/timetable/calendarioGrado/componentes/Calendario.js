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
            //Estado de la ventana de los checkboxs
            showDialog: false,
            //Estado de la fecha seleccionada
            selectedDate: new Date(),
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

    //Actualizar los checkbox con el estado interno de la fecha seleccionada
    onOpenDialog = (date) => {
        console.log(date.jsDate)
        //Obtener todos los checkbox
        let convocatoria = document.getElementById("convocatoria")
        let festivo = document.getElementById("festivo")
        let lectivo = document.getElementById("lectivo")
        let semanaAB = document.getElementById("semanaAB")
        let horarioCambiado = document.getElementById("horarioCambiado")


        //Deseleccionar todos los checkbox
        convocatoria.checked = false
        festivo.checked = false
        semanaAB.checked = false
        horarioCambiado.checked = false
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
        if (date.semanaAB != undefined  && (date.semanaAB == "a" ||date.semanaAB == "b")) {
            semanaAB.checked = true
        }
        if (date.horarioCambiado != undefined) {
            horarioCambiado.checked = true
        }

        this.setState((state, props) => ({
            selectedDate: date,
            showDialog: true,
        }))

    }

    //Actualizar estado interno de la fecha seleccionada
    onCloseDialog = () => {
        let newDateType = "lectivo"
        //Obtener los checkbox
        let convocatoria = document.getElementById("convocatoria")
        let festivo = document.getElementById("festivo")
        let semanaAB = document.getElementById("semanaAB")
        let horarioCambiado = document.getElementById("horarioCambiado")

        if (convocatoria.checked) {
            newDateType = "convocatoria"
        } else if (festivo.checked) {
            newDateType = "festivo"
        }

        if (semanaAB.checked) {
            this.state.selectedDate.semanaAB = "a"
        } else {
            this.state.selectedDate.semanaAB = null
        }
        if (horarioCambiado.checked) {
            this.state.selectedDate.horarioCambiado = "L"
        } else {
            this.state.selectedDate.horarioCambiado = null
        }
        this.state.selectedDate.type = newDateType
        this.setState((state, props) => ({
            showDialog: false,
        }))
    }

    //Hacer que los checkbox sean excluyentes
    onSelectedCheckBox = (id) => {
        let convocatoria = document.getElementById("convocatoria")
        let festivo = document.getElementById("festivo")
        let lectivo = document.getElementById("lectivo")
        let semanaAB = document.getElementById("semanaAB")
        let horarioCambiado = document.getElementById("horarioCambiado")

        switch (id) {
            case "convocatoria":
                if (convocatoria.checked) {
                    festivo.checked = false
                    lectivo.checked = false
                    semanaAB.checked = false
                    horarioCambiado.checked = false
                }
                break;
            case "festivo":
                if (festivo.checked) {
                    convocatoria.checked = false
                    lectivo.checked = false
                    semanaAB.checked = false
                    horarioCambiado.checked = false
                }
                break;
            case "lectivo":
                if (lectivo.checked) {
                    convocatoria.checked = false
                    festivo.checked = false
                } else {
                    //Deseleccionar dia lectivo
                    semanaAB.checked = false
                    horarioCambiado.checked = false
                }
                break;
            case "semanaAB":
                if (semanaAB.checked) {
                    lectivo.checked = true
                    convocatoria.checked = false
                    festivo.checked = false
                }
                break;
            case "horarioCambiado":
                if (horarioCambiado.checked) {
                    lectivo.checked = true
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
                <ul>
                    <li>
                        <label><input type="checkbox" id="convocatoria" onChange={() => {this.onSelectedCheckBox("convocatoria")}}></input>Convocatoria</label><br/>
                    </li>
                    <li>
                        <label><input type="checkbox" id="festivo" onChange={() => {this.onSelectedCheckBox("festivo")}}></input>Festivo</label><br/>
                    </li>
                    <li>
                        <label><input type="checkbox" id="lectivo" onChange={() => {this.onSelectedCheckBox("lectivo")}}></input>Lectivo</label><br/>
                        <ul>
                            <li>
                                <label><input type="checkbox" id="semanaAB" onChange={() => {this.onSelectedCheckBox("semanaAB")}}></input>Semana</label><br/>
                            </li>
                            <li>
                                <label><input type="checkbox" id="horarioCambiado" onChange={() => {this.onSelectedCheckBox("horarioCambiado")}}></input>Dia con horario cambiado a</label><br/>
                            </li>
                        </ul>
                    </li>
                </ul>
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
                            {week.map((day, dayIndex) => (
                                <td key={JSON.stringify(day)} class={day.horarioCambiado != undefined ? "horarioCambiado" : day.type} style={{ padding: '5px 0' }}>
                                    <div onClick={() => this.onOpenDialog(day)} style={{ textAlign: 'center', padding: '5px 0' }}>
                                        {day.type == "lectivo" && day.semanaAB != undefined && day.horarioCambiado != undefined
                                            ? day.date + " " + day.horarioCambiado + day.semanaAB
                                            : day.type == "lectivo" && day.semanaAB != undefined && day.horarioCambiado == undefined
                                                ? day.date + " " + days[dayIndex] + day.semanaAB
                                                : day.type == "lectivo" && day.semanaAB == undefined && day.horarioCambiado != undefined
                                                    ? day.date + " " + day.horarioCambiado
                                                    : day.date
                                        }
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