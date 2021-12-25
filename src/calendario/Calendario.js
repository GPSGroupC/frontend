import React, {Fragment, useState, useEffect, Component} from "react";
import eina from '../images/eina-logo.png'
import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import isWeekend from 'date-fns/isWeekend';
import Api from "./servicios/api";
import Parser from "./utils/Parser";
import Pdf from "./utils/Pdf";
import amarillo from '../images/amarillo.png'
import verde from '../images/verde.png'
import morado from '../images/morado.png'
import blanco from '../images/blanco.png'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Alert} from "@material-ui/lab";
import Parse from "./utils/Parser";
import constants from './utils/Constants'

const {datesGenerator} = require('dates-generator');

class Calendario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //FORMULARIOS
            ultModificacion: null,
            inicioPrimer_cuatri: null,
            inicioSegundo_cuatri: null,
            inicioSegundaConvocatoria: null,
            estadoCurso: "2021-2022",
            //CHECKBOXS
            convocatoriaCheckBox: false,
            festivoCheckBox: false,
            lectivoCheckBox: false,
            semanaABcheckBox: false,
            horarioCambiadoCheckBox: false,
            //CHECKBOX SELECTS
            selectSemanaAB: constants.SEMANAAB_VALORES.A,
            selectHorarioCambiado: constants.HORARIOCAMBIADO_VALORES.LUNES,
            //CALENDAR WEEK AB SELECTOR
            selectS1GlobalSemanaAB:[],
            //DIAS RECUPERADOS DE LA LIBRERIA DATES GENERATOR
            semestre1: {dates: [], year: -1, monthNames: []},
            semestre2: {dates: [], year: -1, monthNames: []},
            recuperacion: {dates: [], year: -1, monthNames: []},
            //DIAS RECUPERADOS DE BACKEND
            fechasSemestre1: {dates: []},
            fechasSemestre2: {dates: []},
            fechasRecuperacion: {dates: []},
            //VENTANA DE OPCIONES
            showDialog: false,
            //FECHA SELECCIONADA
            selectedDate: new Date(),
            semesterSelected: null,
            //DIAS QUE HAN CAMBIADO EN FRONTEND
            semestre1_changed: {dates: []},
            semestre2_changed: {dates: []},
            recuperacion_changed: {dates: []}
        }
    }

    /**
     * Actualiza las fechas de inicio de cada periodo.
     * Actualiza la fecha de ultima modificacion del calendario.
     * Actualiza los dias recuperados de la libreria dates generator
     *
     * @param curso {string}  Formato: "2021-2022"
     */
    async updateMetadata(curso) {
        await Api.getMetadataCalendar(curso).then(r => {
            this.setState({
                //Calendar metadata
                inicioPrimer_cuatri: r[0],
                inicioSegundo_cuatri: r[1],
                inicioSegundaConvocatoria: r[2],
                ultModificacion: r[3],
                //Dias recuperados de la libreria dates generator
                semestre1: this.getPeriodo(r[0]?.getMonth() ?? 8, r[0]?.getFullYear() ?? 2021, 5, this.state.fechasSemestre1,r[0]),
                semestre2: this.getPeriodo(r[1]?.getMonth() ?? 1, r[1]?.getFullYear() ?? 2022, 5, this.state.fechasSemestre2),
                recuperacion: this.getPeriodo(r[2]?.getMonth() ?? 8, r[2]?.getFullYear() ?? 2022, 1, this.state.fechasRecuperacion)
            })
        }).catch(err => {
            console.log("Error al actualizar el calendario: ", err)
        })
    }

    /**
     * Actualiza los dias recuperados de backend correspondientes a un curso y un semestre concreto.
     *
     * @param curso {string}  Formato: "2021-2022"
     * @param semestre {string}
     */
    async updateDaysCalendar(curso, semestre) {
        await Api.getDaysCalendar(curso, semestre).then(response => {

            switch (semestre) {
                case "semestre1":
                    this.setState({fechasSemestre1: response})
                    break;
                case "semestre2":
                    this.setState({fechasSemestre2: response})
                    break;
                case "recuperacion":
                    this.setState({fechasRecuperacion: response})
                    break;
            }

        }).catch(err => {
            console.log("Error al actualizar el calendario: ", err)
        })
    }


    /**
     * Al acceder por primera vez, se actualizan los formularios y el calendario
     * con el curso actual.
     */
    async componentDidMount () {
        const response =  Promise.all(
           [
               this.updateDaysCalendar(this.state.estadoCurso,"semestre1"),
               this.updateDaysCalendar(this.state.estadoCurso,"semestre2"),
               this.updateDaysCalendar(this.state.estadoCurso,"recuperacion"),
           ]
        )
       response.then( _ =>{
           this.updateMetadata(this.state.estadoCurso)
       })

   }

    handleChangePrimerCuatri = (newValue) => {
        this.setState({
            inicioPrimer_cuatri: newValue,
        }, () => {
            this.setState({
                semestre1: this.getPeriodo( 8,  2021, 5, this.state.fechasSemestre1,this.state.inicioPrimer_cuatri),
            })
        })
    };

    handleChangeSegundoCuatri = (newValue) => {
        this.setState({
            inicioSegundo_cuatri: newValue,
        })
    };

    handleChangeSegundaConv = (newValue) => {
        this.setState({
            inicioSegundaConvocatoria: newValue,
        })
    };

    HandleChangeCurso = async (curso) => {
        this.setState({estadoCurso: curso.target.value}, () => {
            const response = Promise.all(
                [
                    this.updateDaysCalendar(this.state.estadoCurso, "semestre1"),
                    this.updateDaysCalendar(this.state.estadoCurso, "semestre2"),
                    this.updateDaysCalendar(this.state.estadoCurso, "recuperacion"),
                ]
            )
            response.then(_ => {
                this.updateMetadata(this.state.estadoCurso)
            })
        })

    }

    /**
     * weekIndexSelected -> Es el indice de semana en la estructura 'semestre1', 'semestre2' o 'recuperacion'
     * Recibe el evento, pulsar en el select global de semana AB en cada semana del calendario
     */
    handleGlobalWeekAB = (event, semestreSelected,monthIndexSelected, weekIndexSelected) => {
        //Si se ha seleccionado el valor c, no hacemos nada
        console.log(event.target.value)
        if (event.target.value !== 'c') {
            //Cambiamos el valor de todos los selects con valor superior al seleccionado
            var weeksList = document.getElementsByClassName(`globalWeekSelectorAB-${semestreSelected}`);
            if (weeksList) {
                //'nextValue' es el siguiente valor a asignar en base al evento recibido 'event'
                var nextValue = event.target.value
                //Iteramos sobre todas las semanas de un semestre (sobre sus selectores de semana)
                for (var i = 0; i < weeksList.length; i++) {
                    var monthIndex = Parse.getNumMonthFromId(weeksList[i].id)
                    var weekIndex = Parse.getNumWeekFromId(weeksList[i].id)
                    //console.log( "numWeek:" + numWeek + " weekNumSelected:" + weekNumInMonth)
                    if (monthIndex > monthIndexSelected || (monthIndex === monthIndexSelected && weekIndex >= weekIndexSelected)) {
                        //Caso es una semana superior a la semana seleccionada
                        //Asignamos un valor 'a' o 'b'
                        this.state.selectS1GlobalSemanaAB[semestreSelected + "-" + monthIndex + "-" + weekIndex] = nextValue
                        //console.log("numWeek >= weekNumSelected: " + numWeek + " >= " + weekNumInMonth)
                        this.updateWeek(semestreSelected,monthIndex,weekIndex, nextValue)
                        nextValue = (nextValue == 'a') ? 'b' : 'a'
                    }
                }
            }
        } else {
            this.updateWeek(semestreSelected,monthIndexSelected,weekIndexSelected, null)
        }
        this.setState((state, props) => ({
        }))
    }

    updateWeek(semester, monthIndex, weekIndex, value) {
        console.log(semester)
        switch(semester) {
            case "semestre1":
                for(let i=0; i < 5; i++){
                    if (this.state.semestre1.dates[monthIndex][weekIndex][i].date != ' ') {
                        this.state.semestre1.dates[monthIndex][weekIndex][i].semanaAB = value
                        this.state.semestre1.dates[monthIndex][weekIndex][i].type = "lectivo"
                        const indiceS1 = this.state.semestre1_changed.dates.findIndex( fecha => fecha.jsDate === this.state.semestre1.dates[monthIndex][weekIndex][i].jsDate);
                        if(indiceS1 !== -1){
                            this.state.semestre1_changed.dates[indiceS1] = this.state.semestre1.dates[monthIndex][weekIndex][i]
                        }else{
                            this.state.semestre1_changed.dates.push(this.state.semestre1.dates[monthIndex][weekIndex][i])
                        }
                    }
                }
                break;
            case "semestre2":
                for(let i=0; i < 5; i++){
                    if (this.state.semestre2.dates[monthIndex][weekIndex][i].date != ' ') {
                        this.state.semestre2.dates[monthIndex][weekIndex][i].semanaAB = value
                        this.state.semestre2.dates[monthIndex][weekIndex][i].type = "lectivo"
                        const indiceS1 = this.state.semestre2_changed.dates.findIndex( fecha => fecha.jsDate === this.state.semestre2.dates[monthIndex][weekIndex][i].jsDate);
                        if(indiceS1 !== -1){
                            this.state.semestre2_changed.dates[indiceS1] = this.state.semestre2.dates[monthIndex][weekIndex][i]
                        }else{
                            this.state.semestre2_changed.dates.push(this.state.semestre2.dates[monthIndex][weekIndex][i])
                        }
                    }
                }
                break;
            default:
                //recuperacion
                for(let i=0; i < 5; i++){
                    if (this.state.recuperacion.dates[monthIndex][weekIndex][i].date != ' ') {
                        this.state.recuperacion.dates[monthIndex][weekIndex][i].semanaAB = value
                        this.state.recuperacion.dates[monthIndex][weekIndex][i].type = "lectivo"
                        const indiceS1 = this.state.recuperacion_changed.dates.findIndex( fecha => fecha.jsDate === this.state.recuperacion.dates[monthIndex][weekIndex][i].jsDate);
                        if(indiceS1 !== -1){
                            this.state.recuperacion_changed.dates[indiceS1] = this.state.recuperacion.dates[monthIndex][weekIndex][i]
                        }else{
                            this.state.recuperacion_changed.dates.push(this.state.recuperacion.dates[monthIndex][weekIndex][i])
                        }
                    }
                }
        }
    }


    /**
     * Devuelve un objecto periodo inicializado {dates,year,monthNames}
     *
     * @param {number} month    El mes en el que empieza el periodo. month 0 -> Enero
     * @param {number} year     El anho en el que empieza el periodo
     * @param {number} numMonths Duracion del periodo en meses
     */
    getPeriodo = (month, year, numMonths, fechasCuatri, inicioPrimerCuatri) => {
        // startingDay es el dia asociado a la primera fecha de cada semana
        // startingDay 0 -> Domingo

        let queryDate = {month: month, year: year, startingDay: 1}
        let acumDates = []
        let monthNames = []

        for (let i = 0; i < numMonths; i++) {
            const {dates, nextMonth, nextYear} = datesGenerator(queryDate)

            for (let i = 0; i < dates.length; i++) {
                for (let j = 0; j < dates[i].length; j++) {
                    if (dates[i][j].month !== queryDate.month) {
                        dates[i][j].date = ' '
                    }
                }
            }
            console.log(dates)
            Parser.ParseDate(dates, fechasCuatri,inicioPrimerCuatri)
            Parser.parseFestivos(dates)

            acumDates = [...acumDates, dates]
            monthNames = [...monthNames, constants.MONTHS[queryDate.month]]
            queryDate = {month: nextMonth, year: nextYear, startingDay: 1}
        }
        //  dates:      lista de fechas con formato: meses[ semanas[ {fecha} ] ]
        //  year:       Año mostrado en la interfaz
        //  monthNames: lista de nombres de meses mostrados en la interfaz
        return {dates: acumDates, year: year, monthNames: monthNames}
    }

    /**
     * Handler del evento: pulsar un fecha.
     * Inicializa los checkboxs según el estado interno de la fecha seleccionada
     * y abre una ventana de dialogo.
     *
     * @param {Object} date     Fecha seleccionada
     */
    onSelectDate = (date, tipoSemestre) => {

        // Obtener selects
        // Deseleccionamos todos los checkbox
        this.cleanCheckboxs()
        switch (date.type) {
            case constants.TIPOS_FECHA.CONVOCATORIA:
                // El dia es de tipo convocatoria
                this.state.convocatoriaCheckBox = true
                break;
            case constants.TIPOS_FECHA.FESTIVO:
                // El dia es de tipo festivo
                this.state.festivoCheckBox = true
                break;
            default:
                // date.type == undefined. El dia es de tipo lectivo
                this.state.lectivoCheckBox = true
                break;
        }
        
        if (date.semanaAB != undefined) {
            // El dia pertenece a semana a/b
            this.state.semanaABcheckBox = true
            date.semanaAB = this.state.selectSemanaAB
        }
        if (date.horarioCambiado != undefined) {
            // El dia tiene horario cambiado
            this.state.horarioCambiadoCheckBox = true
            date.horarioCambiado = this.state.selectHorarioCambiado
        }

        this.setState((state, props) => ({
            selectedDate: date, //Fecha seleccionada.
            semesterSelected: tipoSemestre, //Tipo de semestre seleccionado según el día "semestre1,2 o recus"
            showDialog: true, //Mostrar dialogo con checkboxs inicializados
        }))

    }

    /**
     * Handler del evento: pulsar boton cerrar de la ventana de dialogo
     * Actualiza el estado interno de la fecha seleccionada y cierra
     * la ventana de dialogo
     */
    onCloseDialog = () => {
        //Por defecto fecha seleccionada marcada como lectivo
        let newDateType = constants.TIPOS_FECHA.LECTIVO
        if (this.state.convocatoriaCheckBox) {
            //Fecha seleccionada marcada como convocatoria
            newDateType = constants.TIPOS_FECHA.CONVOCATORIA
        } else if (this.state.festivoCheckBox) {
            //Fecha seleccionada marcada como festivo
            newDateType = constants.TIPOS_FECHA.FESTIVO
        }
        this.state.selectedDate.type = newDateType

        if (this.state.semanaABcheckBox) {
            //Fecha seleccionada marcada como semana a/b
            this.state.selectedDate.semanaAB = this.state.selectSemanaAB
        } else {
            this.state.selectedDate.semanaAB = null
        }
        if (this.state.horarioCambiadoCheckBox) {
            //Fecha seleccionada marcada como horario cambiado
            this.state.selectedDate.horarioCambiado = this.state.selectHorarioCambiado
        } else {
            this.state.selectedDate.horarioCambiado = null
        }
       switch(this.state.semesterSelected){
           case "semestre1":
               const indiceS1 = this.state.semestre1_changed.dates.findIndex( fecha => fecha.jsDate === this.state.selectedDate.jsDate);
                if(indiceS1 !== -1){
                    this.state.semestre1_changed.dates[indiceS1] = this.state.selectedDate
                }else{
                    this.state.semestre1_changed.dates.push(this.state.selectedDate)
                }
                break;
            case "semestre2":
                const indiceS2 = this.state.semestre2_changed.dates.findIndex( fecha => fecha.jsDate === this.state.selectedDate.jsDate);
                if(indiceS2 !== -1){
                    this.state.semestre2_changed.dates[indiceS2] = this.state.selectedDate
                }else{
                    this.state.semestre2_changed.dates.push(this.state.selectedDate)
                }
                break;
            case "recuperacion":
                const indiceS3 = this.state.recuperacion_changed.dates.findIndex( fecha => fecha.jsDate === this.state.selectedDate.jsDate);
                if(indiceS3 !== -1){
                    this.state.recuperacion_changed.dates[indiceS3] = this.state.selectedDate
                }else{
                    this.state.recuperacion_changed.dates.push(this.state.selectedDate)
                }
                break;
        }

        this.setState({showDialog: false});
    }

    /**
     * Handler del evento: Interactuar con un checkbox.
     * Gestiona que los checkboxs `convocatoria`, `festivo` y `lectivo`sean mutuamente excluyentes
     * Gestiona que los checkboxs `semanaAB` y `horarioCambiado` se deseleccionen al deseleccionar `lectivo`.
     * Gestiona que el checkbox `lectivo`se seleccione al seleccionar `semanaAB` o `horarioCambiado`.
     */
    onSelectedCheckBox = (id, checked) => {
        switch (id) {
            case constants.TIPOS_FECHA.CONVOCATORIA:
                if (checked) {
                    this.setState((state, props) => ({
                        convocatoriaCheckBox: true,
                        festivoCheckBox: false,
                        lectivoCheckBox: false,
                        semanaABcheckBox: false,
                        horarioCambiadoCheckBox:false,
                    }))
                }
                break;
            case constants.TIPOS_FECHA.FESTIVO:
                if (checked) {
                    this.setState((state, props) => ({
                        festivoCheckBox: true,
                        convocatoriaCheckBox: false,
                        lectivoCheckBox: false,
                        semanaABcheckBox: false,
                        horarioCambiadoCheckBox:false,
                    }))
                }
                break;
            case constants.TIPOS_FECHA.LECTIVO:
                if (checked) {
                    this.setState((state, props) => ({
                        lectivoCheckBox: true,
                        convocatoriaCheckBox: false,
                        festivoCheckBox: false,
                    }))

                }
                break;
            case constants.TIPOS_FECHA.SEMANAAB:
                if (checked) {
                    this.setState((state, props) => ({
                        semanaABcheckBox: true,
                        lectivoCheckBox: true,
                        convocatoriaCheckBox: false,
                        festivoCheckBox: false,
                    }))
                } else {
                    this.setState((state, props) => ({
                        semanaABcheckBox: false,
                    }))
                }
                break;
            case constants.TIPOS_FECHA.HORARIOCAMBIADO:
                if (checked) {
                    this.setState((state, props) => ({
                        horarioCambiadoCheckBox:true,
                        lectivoCheckBox: true,
                        convocatoriaCheckBox: false,
                        festivoCheckBox: false,
                    }))
                } else {
                    this.setState((state, props) => ({
                        horarioCambiadoCheckBox:false,
                    }))
                }
        }
    }

    /**
     * Deselecciona todos los checkbox
     */
    cleanCheckboxs() {
        this.state.convocatoriaCheckBox = false
        this.state.festivoCheckBox = false
        this.state.lectivoCheckBox = false
        this.state.semanaABcheckBox = false
        this.state.horarioCambiadoCheckBox = false
    }

    htmlDialog() {
        return (
            <dialog className="dialog" open={this.state.showDialog ? true : false}>
                <ul>
                    <li>
                        <label>
                            <input type="checkbox" id={constants.TIPOS_FECHA.CONVOCATORIA} checked={this.state.convocatoriaCheckBox}
                                      onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.CONVOCATORIA, e.target.checked)}}>
                            </input>
                            Convocatoria
                        </label>
                        <br/>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" id={constants.TIPOS_FECHA.FESTIVO} checked={this.state.festivoCheckBox}
                                      onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.FESTIVO, e.target.checked)}}>
                            </input>
                            Festivo
                        </label>
                        <br/>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" id={constants.TIPOS_FECHA.LECTIVO} checked={this.state.lectivoCheckBox}
                                      onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.LECTIVO, e.target.checked)}}>
                            </input>
                            Lectivo
                        </label>
                        <br/>
                        <ul>
                            <li>
                                <label>
                                    <input type="checkbox" id={constants.TIPOS_FECHA.SEMANAAB} checked={this.state.semanaABcheckBox}
                                           onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.SEMANAAB, e.target.checked)}}>
                                    </input>
                                    Semana
                                </label>
                                <select value={this.state.selectSemanaAB}
                                        onChange={(e) => {this.setState({selectSemanaAB: e.target.value})}}>
                                    <option value={constants.SEMANAAB_VALORES.A}>a</option>
                                    <option value={constants.SEMANAAB_VALORES.B}>b</option>
                                </select>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" id={constants.TIPOS_FECHA.HORARIOCAMBIADO}
                                           checked={this.state.horarioCambiadoCheckBox}
                                           onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.HORARIOCAMBIADO, e.target.checked)}}>
                                    </input>
                                    Dia con horario cambiado a
                                </label>
                                <br/>
                                <select value={this.state.selectHorarioCambiado}
                                        onChange={(e) => {this.setState({selectHorarioCambiado: e.target.value})}}>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.LUNES}>L</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.MARTES}>M</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.MIERCOLES}>X</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.JUEVES}>J</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.VIERNES}>V</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.SABADO}>S</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.DOMINGO}>D</option>
                                </select>
                            </li>
                        </ul>
                    </li>
                </ul>
                <button className="btn btn-info" id="closeDialog" onClick={() => this.onCloseDialog()}>Cerrar</button>
            </dialog>
        )
    }

    /**
     * Muestra una tabla con un periodo del calendario, para el primer semestre
     *
     * @param periodo   Objeto periodo que se quiere renderizar en una tabla
     */
    htmlTable(periodo, semestre) {
        var weekNum = 0
        return (
            <table id="calendarTable">
                <thead style={{fontWeight: 'bold'}}>
                <tr>
                    <td style={{fontWeight: 'bold',border: "2px solid #476b6b"}}>{periodo.year}</td>
                    <td style={{backgroundColor: "#476b6b",color:"white"}}>Sem</td>
                    {constants.DAYS.map((day) => (
                        <td style={{backgroundColor: "#476b6b", color:"white"}} key={day} >
                            <div style={{textAlign: 'center'}}>
                                {day}
                            </div>
                        </td>
                    ))}
                </tr>
                </thead>
                {periodo.dates.length > 0 && periodo.dates.map((month, monthIndex) => (

                    <tbody>
                    <tr>
                        <td style={{fontWeight: 'bold', width:"50px", borderBottom: "1px solid #476b6b"}} rowSpan={month.length + 1} scope="rowgroup">
                            {periodo.monthNames[monthIndex]}

                        </td>
                    </tr>
                    {month.length > 0 && month.map((week, weekIndex) => (
                        (Parse.weekIsBlank(week))
                            ? ''
                            :(<tr key={JSON.stringify(week[0])} >
                            <td style={{borderRight: "1px solid #476b6b", borderLeft: "1px solid #476b6b"}}>
                                {  /*Solo aumentamos el número de semana si empieza en Lunes o es la primera semana del primer mes del semestre,
                                    para evitar que el calendario que corta las semanas cuente algunas semanas dos veces seguidas.
                                    */
                                    semestre === "recuperacion"
                                    ? void(0)
                                        : Parser.devolverDiaSemana(week[0].date,week[0].month,week[0].year) === constants.DIAS_SEMANA_ENUMERADOS.LUNES
                                        || (monthIndex === 0 && weekIndex === 0)
                                            ? weekNum= weekNum + 1
                                            : void(0)
                                }
                            </td>
                            {week.map((day, dayIndex) => (
                                <td key={JSON.stringify(day)}
                                    class={day.horarioCambiado != undefined ? "horarioCambiado" : day.type}
                                    style={{marginLeft: "15px",marginRight:'10px'}}>
                                    <div onClick={() => this.onSelectDate(day, semestre)}
                                         style={{cursor: 'pointer',textAlign: 'center',marginRight:'2px', marginBottom: "5px", marginLeft: "15px"}}>
                                        {Parser.showCalendarDate(day, constants.DAYS[dayIndex])}
                                    </div>
                                    {(day === this.state.selectedDate)
                                        ?this.htmlDialog()
                                        :''
                                    }
                                </td>
                            ))}
                                <select value={this.state.selectS1GlobalSemanaAB[semestre + "-" + monthIndex + "-" + weekIndex]}id={`globalWeekSelectorAB-${monthIndex}-${weekIndex}`}className={`globalWeekSelectorAB-${semestre}`}
                                        onChange={(e) => {this.handleGlobalWeekAB(e,semestre,monthIndex, weekIndex)}}>
                                    <option value={constants.SEMANAAB_VALORES.C}>-</option>
                                    <option value={constants.SEMANAAB_VALORES.A}>a</option>
                                    <option value={constants.SEMANAAB_VALORES.B}>b</option>
                                </select>
                        </tr>)
                    ))}
                    </tbody>
                ))}
            </table>

        )
    }


    render() {
        return (
            <div className="bodyMargin">
                <div className="header">
                    <h4 className="titulo">EDITAR CALENDARIO GRADOS</h4>
                    <Link to="/">
                        <button type="button" className="btn btn-info btn-lg">SALIR SIN GUARDAR</button>
                    </Link>
                </div>
                <br/>
                <hr size="5px" color="black"/>
                <br/><br/>
                <div className="filtro2">
                    <h5 className="titulo">Selecciona qué curso quieres editar</h5>
                    <div className="select">
                        <label htmlFor="exampleSelect1" className="form-label mt-4">Curso</label>
                        <select value={this.state.estadoCurso} onChange={this.HandleChangeCurso} className="form-select"
                                id="exampleSelect1">
                            <option value="2021-2022">2021-2022</option>
                            <option value="2022-2023">2022-2023</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2026-2027">2026-2027</option>
                        </select>
                        <br></br>
                    </div>

                    <Alert severity="info" style={{width:"300px"}}>Última
                        modificación: {Parser.dateToString(this.state.ultModificacion)}</Alert>
                    <br/><br/>

                    <h5 className="titulo">Selecciona el inicio de cada periodo del calendario</h5>
                    <h10 className="texto1">Inicio primer semestre</h10>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                            <Stack spacing={3} className="select">
                                <DesktopDatePicker
                                    label="dd/mm/yyyy"
                                    inputFormat="dd/MM/yyyy"
                                    value={this.state.inicioPrimer_cuatri}
                                    onChange={this.handleChangePrimerCuatri}
                                    defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[0], 8)}
                                    minDate={new Date("9-1-" + this.state.estadoCurso.split('-')[0])}
                                    maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[0])}
                                    shouldDisableDate={isWeekend}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </div>

                        <br></br>
                        <h10 className="texto1">Inicio segundo semestre</h10>
                        <Stack spacing={3} className="select">
                            <DesktopDatePicker
                                label="dd/mm/yyyy"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.inicioSegundo_cuatri}
                                defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1], 1)}
                                minDate={new Date("2-1-" + this.state.estadoCurso.split('-')[1])}
                                maxDate={new Date("2-29-" + this.state.estadoCurso.split('-')[1])}
                                onChange={this.handleChangeSegundoCuatri}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>

                        <br></br>
                        <h10 className="texto1">Inicio período exámenes 2ª convocatoria</h10>
                        <Stack spacing={3} className="select">
                            <DesktopDatePicker
                                label="dd/mm/yyyy"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.inicioSegundaConvocatoria}
                                onChange={this.handleChangeSegundaConv}
                                defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1], 8)}
                                minDate={new Date("9-1-" + this.state.estadoCurso.split('-')[1])}
                                maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[1])}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <br/><br/>


                    <h5 className="titulo">Añade los días especiales pulsando directamente sobre las fechas del
                        calendario</h5>
                    <div id="divToPrintId" className="divToPrint">

                        <div className="pdfHeader">
                            <img src={eina} alt="einaLogo" width="250" height="70" style={{marginTop: '2%'}}/>
                            <p style={{marginTop: '2%'}}>EINA calendario académico <br/>
                                GRADOS <br/>
                                Curso {this.state.estadoCurso} <br/>
                                Última modificación {
                                    ((this.state.ultModificacion !== null) &&
                                        this.state.ultModificacion?.getDate() + "/"
                                        + (this.state.ultModificacion?.getMonth() + 1) + "/"
                                        + this.state.ultModificacion?.getFullYear())}
                            </p>
                        </div>

                        <div className="calendarTable">
                            <div>
                                <h7 className="titulo">Primer semestre</h7>
                                {this.htmlTable(this.state.semestre1,"semestre1")}
                                <h7 className="titulo">Período exámenes 2ª convocatoria</h7>
                                {this.htmlTable(this.state.recuperacion,"recuperacion")}
                            </div>
                            <div>
                                <h7 className="titulo">Segundo semestre</h7>
                                {//No quiteis los string de semestre1 y semestre2 y recuperacion sino en el backend va ir mal.
                                    this.htmlTable(this.state.semestre2,"semestre2")}
                            </div>
                        </div>
                        <br/>
                        <div className="leyendaDiv">
                        <span>
                            <img className="leyenda" src={blanco}/>
                            <p id="textoLeyenda">Día lectivo</p>

                            <img className="leyenda" style={{marginLeft: '1%'}} src={amarillo}/>
                            <p id="textoLeyenda">Día con horario de otro día de la semana</p>               
                        </span>
                        </div>

                        <div className="leyendaDiv">
                        <span>
                            <img className="leyenda" src={verde}/>
                            <p id="textoLeyenda">Día festivo</p>  

                            <img className="leyenda" style={{marginLeft: '1%'}} src={morado}/>
                            <p id="textoLeyenda">Día reservado para la realización de exámenes de convocatoria</p>
                        </span>
                        </div>

                    </div>
                </div>
                <br/><br/>
                <div className="header">
                <Link to="/">
                    <button onClick={() => {
                        Api.putAllCalendarData(this.state.inicioPrimer_cuatri,
                            this.state.inicioSegundo_cuatri,
                            this.state.inicioSegundaConvocatoria,
                            this.state.estadoCurso);
                        //Api.putSemester(this.state.estadoCurso, "semestre1", this.state.semestre1)
                        Api.putSemester(this.state.estadoCurso, "semestre1", this.state.semestre1_changed)
                        Api.putSemester(this.state.estadoCurso, "semestre2", this.state.semestre2_changed)
                        Api.putSemester(this.state.estadoCurso, "recuperacion", this.state.recuperacion_changed)
                    }} type="button" className="btn btn-info btn-lg" >GUARDAR CALENDARIO
                    </button>
                </Link>

                <div className="printButton" style={{marginTop: '20px'}}>
                    <button onClick={() => {
                        Pdf.download("divToPrintId")
                    }} className="btn btn-outline-info btn-lg">DESCARGAR COMO PDF
                    </button>
                </div>
                </div>
            </div>
        );
    }
}

export default Calendario;

