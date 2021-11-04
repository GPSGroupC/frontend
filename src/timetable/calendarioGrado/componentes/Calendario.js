import React, {Component} from 'react';
import Parser from "../utils/Parser";
const { datesGenerator } = require('dates-generator');

//Cabeceras
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

//Tipos de fecha
const TIPOFECHA = {C: 'convocatoria', F: 'festivo', L: 'lectivo'};
const TIPOFECHALECTIVO = {S: 'semanaAB', H: 'horarioCambiado'};

class Calendario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Objetos periodo -> (semestre1, semestre2 y recuperacion)
            //  dates:      lista de fechas con formato: meses[ semanas[ {fecha} ] ]
            //  year:       Año mostrado en la interfaz
            //  monthNames: lista de nombres de meses mostrados en la interfaz
            //
            semestre1:{dates: [], year: -1, monthNames:[]},
            semestre2:{dates: [], year: -1, monthNames:[]},
            recuperacion:{dates: [], year: -1, monthNames:[]},
            //Estado de la ventana de opciones
            showDialog: false,
            //Fecha seleccionada al hacer click
            selectedDate: new Date(),
        }
    }

    /**
     * Devuelve un objecto periodo inicializado {dates,year,monthNames}
     *
     * @param {number} month    El mes en el que empieza el periodo. month 0 -> Enero
     * @param {number} year     El anho en el que empieza el periodo
     * @param {number} numMonths Duracion del periodo en meses
     */
    getPeriodo = (month, year, numMonths) => {
        // startingDay es el dia asociado a la primera fecha de cada semana
        // startingDay 0 -> Domingo
        let queryDate = {month: month, year: year, startingDay: 1}
        let acumDates = []
        let monthNames = []
        for (let i = 0; i < numMonths; i++) {
            const { dates, nextMonth, nextYear } = datesGenerator(queryDate)
            Parser.parseFestivos(dates)
            acumDates = [...acumDates,dates]
            monthNames = [...monthNames, MONTHS[queryDate.month]]
            queryDate = {month: nextMonth, year: nextYear, startingDay: 1}
        }
        return { dates: acumDates, year: year, monthNames: monthNames}
    }

    /**
     * Handler del evento: pulsar un fecha.
     * Inicializa los checkboxs según el estado interno de la fecha seleccionada
     * y abre una ventana de dialogo.
     *
     * @param {Object} date     Fecha seleccionada
     */
    onSelectDate = (date) => {
        console.log(date.jsDate)
        // Obtener checkboxs
        let checkboxs = this.getHTMLCheckboxs()
        // Obtener selects
        let selects = this.getHTMLSelects()
        // Deseleccionamos todos los checkbox
        Object.values(checkboxs).map((checkbox) => {checkbox.checked = false})
        switch(date.type) {
            case TIPOFECHA.C:
                // El dia es de tipo convocatoria
                checkboxs.convocatoria.checked = true
                break;
            case TIPOFECHA.F:
                // El dia es de tipo festivo
                checkboxs.festivo.checked = true
                break;
            default:
                // date.type == undefined. El dia es de tipo lectivo
                checkboxs.lectivo.checked = true
                break;
        }
        if (date.semanaAB != undefined) {
            // El dia pertenece a semana a/b
            checkboxs.semanaAB.checked = true
            date.semanaAB = selects.selectSemanaAB.value
        }
        if (date.horarioCambiado != undefined) {
            // El dia tiene horario cambiado
            checkboxs.horarioCambiado.checked = true
            date.horarioCambiado = selects.selectHorarioCambiado.value
        }
        this.setState((state, props) => ({
            selectedDate: date, //Fecha seleccionada.
            showDialog: true, //Mostrar dialogo con checkboxs inicializados
        }))

    }

    /**
     * Handler del evento: pulsar boton cerrar de la ventana de dialogo
     * Actualiza el estado interno de la fecha seleccionada y cierra
     * la ventana de dialogo
     */
    onCloseDialog = () => {
        // Obtener checkboxs
        let checkboxs = this.getHTMLCheckboxs()
        // Obtener selects
        let selects = this.getHTMLSelects()
        //Por defecto fecha seleccionada marcada como lectivo
        let newDateType = TIPOFECHA.L
        if (checkboxs.convocatoria.checked) {
            //Fecha seleccionada marcada como convocatoria
            newDateType = TIPOFECHA.C
        } else if (checkboxs.festivo.checked) {
            //Fecha seleccionada marcada como festivo
            newDateType = TIPOFECHA.F
        }
        this.state.selectedDate.type = newDateType

        if (checkboxs.semanaAB.checked) {
            //Fecha seleccionada marcada como semana a/b
            this.state.selectedDate.semanaAB = selects.selectSemanaAB.value
        } else {
            this.state.selectedDate.semanaAB = null
        }
        if (checkboxs.horarioCambiado.checked) {
            //Fecha seleccionada marcada como horario cambiado
            this.state.selectedDate.horarioCambiado = selects.selectHorarioCambiado.value
        } else {
            this.state.selectedDate.horarioCambiado = null
        }
        this.setState((state, props) => ({
            showDialog: false, //Dejar de mostrar el dialogo de opciones
        }))
    }

    /**
     * Handler del evento: Interactuar con un checkbox.
     * Gestiona que los checkboxs `convocatoria`, `festivo` y `lectivo`sean mutuamente excluyentes
     * Gestiona que los checkboxs `semanaAB` y `horarioCambiado` se deseleccionen al deseleccionar `lectivo`.
     * Gestiona que el checkbox `lectivo`se seleccione al seleccionar `semanaAB` o `horarioCambiado`.
     */
    onSelectedCheckBox = (id) => {
        // Obtener checkboxs
        let checkboxs = this.getHTMLCheckboxs()
        //Selects
        switch (id) {
            case TIPOFECHA.C:
                if (checkboxs.convocatoria.checked) {
                    checkboxs.festivo.checked = false
                    checkboxs.lectivo.checked = false
                    checkboxs.semanaAB.checked = false
                    checkboxs.horarioCambiado.checked = false
                }
                break;
            case TIPOFECHA.F:
                if (checkboxs.festivo.checked) {
                    checkboxs.convocatoria.checked = false
                    checkboxs.lectivo.checked = false
                    checkboxs.semanaAB.checked = false
                    checkboxs.horarioCambiado.checked = false
                }
                break;
            case TIPOFECHA.L:
                if (checkboxs.lectivo.checked) {
                    checkboxs.convocatoria.checked = false
                    checkboxs.festivo.checked = false
                } else {
                    //Deseleccionar dia lectivo
                    checkboxs.semanaAB.checked = false
                    checkboxs.horarioCambiado.checked = false
                }
                break;
            case TIPOFECHALECTIVO.S:
                if (checkboxs.semanaAB.checked) {
                    checkboxs.lectivo.checked = true
                    checkboxs.convocatoria.checked = false
                    checkboxs.festivo.checked = false
                }
                break;
            case TIPOFECHALECTIVO.H:
                if (checkboxs.horarioCambiado.checked) {
                    checkboxs.lectivo.checked = true
                    checkboxs.convocatoria.checked = false
                    checkboxs.festivo.checked = false
                }
        }
    }

    /**
     * Devuelve todos los objetos checkbox de la interfaz html
     */
    getHTMLCheckboxs() {
        let convocatoria = document.getElementById(TIPOFECHA.C)
        let festivo = document.getElementById(TIPOFECHA.F)
        let lectivo = document.getElementById(TIPOFECHA.L)
        let semanaAB = document.getElementById(TIPOFECHALECTIVO.S)
        let horarioCambiado = document.getElementById(TIPOFECHALECTIVO.H)
        return { convocatoria, festivo, lectivo, semanaAB, horarioCambiado }
    }

    /**
     *
     * Devuelve todos los objetos select de la interfaz html
     */
    getHTMLSelects() {
        let selectSemanaAB = document.getElementById("selectSemanaAB")
        let selectHorarioCambiado = document.getElementById("selectHorarioCambiado")
        return { selectSemanaAB, selectHorarioCambiado }
    }

    /**
     * Inicializa todos los periodos del calendario.
     * Este metodo se ejecuta solo la primera vez que el componente Calendario
     * se renderiza.
     */
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
                        <label><input type="checkbox" id={TIPOFECHA.C} onChange={() => {this.onSelectedCheckBox(TIPOFECHA.C)}}></input>Convocatoria</label><br/>
                    </li>
                    <li>
                        <label><input type="checkbox" id={TIPOFECHA.F}onChange={() => {this.onSelectedCheckBox(TIPOFECHA.F)}}></input>Festivo</label><br/>
                    </li>
                    <li>
                        <label><input type="checkbox" id={TIPOFECHA.L} onChange={() => {this.onSelectedCheckBox(TIPOFECHA.L)}}></input>Lectivo</label><br/>
                        <ul>
                            <li>
                                <label><input type="checkbox" id={TIPOFECHALECTIVO.S} onChange={() => {this.onSelectedCheckBox(TIPOFECHALECTIVO.S)}}></input>Semana</label>
                                <select id="selectSemanaAB">
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                </select>
                            </li>
                            <li>
                                <label><input type="checkbox" id={TIPOFECHALECTIVO.H} onChange={() => {this.onSelectedCheckBox(TIPOFECHALECTIVO.H)}}></input>Dia con horario cambiado a</label><br/>
                                <select id="selectHorarioCambiado">
                                    <option value="L">L</option>
                                    <option value="M">M</option>
                                    <option value="X">X</option>
                                    <option value="J">J</option>
                                    <option value="V">V</option>
                                    <option value="S">S</option>
                                    <option value="D">D</option>
                                </select>
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
                    {DAYS.map((day) => (
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
                                    <div onClick={() => this.onSelectDate(day)} style={{ textAlign: 'center', padding: '5px 0' }}>
                                        {Parser.formatDate(day, DAYS[dayIndex], TIPOFECHA)}
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