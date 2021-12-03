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

const {datesGenerator} = require('dates-generator');


//Cabeceras del calendario
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

//Tipos internos de cada fecha del calendario
const TIPOFECHA = {C: 'convocatoria', F: 'festivo', L: 'lectivo'};
const TIPOFECHALECTIVO = {S: 'semanaAB', H: 'horarioCambiado'};

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
            selectSemanaAB: "a",
            selectHorarioCambiado: "L",
            //CALENDARIO
            semestre1: {dates: [], year: -1, monthNames: []},
            semestre2: {dates: [], year: -1, monthNames: []},
            recuperacion: {dates: [], year: -1, monthNames: []},
            fechasSemestre1: {dates: []},
            fechasSemestre2: {dates: []},
            fechasRecuperacion: {dates: []},
            //VENTANA DE OPCIONES
            showDialog: false,
            //FECHA SELECCIONADA
            selectedDate: new Date(),
            semesterSelected: null,
            //DIAS QUE HAN CAMBIADO
            semestre1_changed: {dates: []},
            semestre2_changed: {dates: []},
            recuperacion_changed: {dates: []}
        }
    }

    /**
     * Actualiza los formularios y el calendario
     *
     * @param curso {string}  Curso que se quiere actualizar
     */
    async updateCalendario(curso) {
        await Api.getAllCalendarData(curso).then(r => {
            this.setState({
                inicioPrimer_cuatri: r[0],
                inicioSegundo_cuatri: r[1],
                inicioSegundaConvocatoria: r[2],
                ultModificacion: r[3],
                semestre1: this.getPeriodo(r[0]?.getMonth() ?? 8, r[0]?.getFullYear() ?? 2021, 5, this.state.fechasSemestre1,r[0]),
                semestre2: this.getPeriodo(r[1]?.getMonth() ?? 1, r[1]?.getFullYear() ?? 2022, 5, this.state.fechasSemestre2),
                recuperacion: this.getPeriodo(r[2]?.getMonth() ?? 8, r[2]?.getFullYear() ?? 2022, 1, this.state.fechasRecuperacion)
            })
        }).catch(err => {
            console.log("Error al actualizar el calendario: ", err)
        })
    }

    /**
     * Actualiza el calendario
     *
     * @param curso {string}  Curso que se quiere actualizar.
     * @param semestre {string} Semestre del que se quiere obtener la información de los calendarios.
     */
    async updateCalendarioSemesters(curso, semestre) {
        await Api.getAllCalendarSemesterData(curso, semestre).then(response => {

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
               this.updateCalendarioSemesters(this.state.estadoCurso,"semestre1"),
               this.updateCalendarioSemesters(this.state.estadoCurso,"semestre2"),
               this.updateCalendarioSemesters(this.state.estadoCurso,"recuperacion"),
           ]
        )
       response.then( _ =>{
           this.updateCalendario(this.state.estadoCurso)
       })

   }

    //METODOS PARA FORMULARIOS
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
                    this.updateCalendarioSemesters(this.state.estadoCurso, "semestre1"),
                    this.updateCalendarioSemesters(this.state.estadoCurso, "semestre2"),
                    this.updateCalendarioSemesters(this.state.estadoCurso, "recuperacion"),
                ]
            )
            response.then(_ => {
                this.updateCalendario(this.state.estadoCurso)
            })
        })

    }


    //METODOS PARA CALENDARIO
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
            
            Parser.ParseDate(dates, fechasCuatri,inicioPrimerCuatri)
            Parser.parseFestivos(dates)

            acumDates = [...acumDates, dates]
            monthNames = [...monthNames, MONTHS[queryDate.month]]
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
            case TIPOFECHA.C:
                // El dia es de tipo convocatoria
                this.state.convocatoriaCheckBox = true
                break;
            case TIPOFECHA.F:
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
        let newDateType = TIPOFECHA.L
        if (this.state.convocatoriaCheckBox) {
            //Fecha seleccionada marcada como convocatoria
            newDateType = TIPOFECHA.C
        } else if (this.state.festivoCheckBox) {
            //Fecha seleccionada marcada como festivo
            newDateType = TIPOFECHA.F
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
            console.log(this.state.selectHorarioCambiado)
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
            case TIPOFECHA.C:
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
            case TIPOFECHA.F:
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
            case TIPOFECHA.L:
                if (checked) {
                    this.setState((state, props) => ({
                        lectivoCheckBox: true,
                        convocatoriaCheckBox: false,
                        festivoCheckBox: false,
                    }))

                }
                break;
            case TIPOFECHALECTIVO.S:
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
            case TIPOFECHALECTIVO.H:
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
            <dialog id="dialog" open={this.state.showDialog ? true : false}>
                <ul>
                    <li>
                        <label>
                            <input type="checkbox" id={TIPOFECHA.C} checked={this.state.convocatoriaCheckBox}
                                      onChange={(e) => {this.onSelectedCheckBox(TIPOFECHA.C, e.target.checked)}}>
                            </input>
                            Convocatoria
                        </label>
                        <br/>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" id={TIPOFECHA.F} checked={this.state.festivoCheckBox}
                                      onChange={(e) => {this.onSelectedCheckBox(TIPOFECHA.F, e.target.checked)}}>
                            </input>
                            Festivo
                        </label>
                        <br/>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" id={TIPOFECHA.L} checked={this.state.lectivoCheckBox}
                                      onChange={(e) => {this.onSelectedCheckBox(TIPOFECHA.L, e.target.checked)}}>
                            </input>
                            Lectivo
                        </label>
                        <br/>
                        <ul>
                            <li>
                                <label>
                                    <input type="checkbox" id={TIPOFECHALECTIVO.S} checked={this.state.semanaABcheckBox}
                                           onChange={(e) => {this.onSelectedCheckBox(TIPOFECHALECTIVO.S, e.target.checked)}}>
                                    </input>
                                    Semana
                                </label>
                                <select value={this.state.selectSemanaAB}
                                        onChange={(e) => {this.setState({selectSemanaAB: e.target.value})}}>
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                </select>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" id={TIPOFECHALECTIVO.H}
                                           checked={this.state.horarioCambiadoCheckBox}
                                           onChange={(e) => {this.onSelectedCheckBox(TIPOFECHALECTIVO.H, e.target.checked)}}>
                                    </input>
                                    Dia con horario cambiado a
                                </label>
                                <br/>
                                <select value={this.state.selectHorarioCambiado}
                                        onChange={(e) => {this.setState({selectHorarioCambiado: e.target.value})}}>
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

    /**
     * Muestra una tabla con un periodo del calendario, para el primer semestre
     *
     * @param periodo   Objeto periodo que se quiere renderizar en una tabla
     */
    htmlTable(periodo, semestre) {
        return (
            <table style={{fontSize: 'small', marginLeft: '20px', marginRight: '20px'}}>
                <thead style={{fontWeight: 'bold'}}>
                <tr>
                    <td style={{fontWeight: 'bold'}}>{periodo.year}</td>
                    {DAYS.map((day) => (
                        <td key={day}>
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
                        <td style={{fontWeight: 'bold'}} rowSpan={month.length + 1} scope="rowgroup">
                            {periodo.monthNames[monthIndex]}

                        </td>
                    </tr>
                    {month.length > 0 && month.map((week) => (
                        <tr key={JSON.stringify(week[0])}>
                            {week.map((day, dayIndex) => (
                                <td key={JSON.stringify(day)}
                                    class={day.horarioCambiado != undefined ? "horarioCambiado" : day.type}
                                    style={{marginLeft: "15px",marginRight:'10px'}}>
                                    <div onClick={() => this.onSelectDate(day, semestre)}
                                         style={{cursor: 'pointer',textAlign: 'center',marginRight:'2px', marginBottom: "5px", marginLeft: "15px"}}>
                                        {Parser.formatDate(day, DAYS[dayIndex], TIPOFECHA)}
                                    </div>
                                    {(day === this.state.selectedDate)
                                        ?this.htmlDialog()
                                        :''
                                    }
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
                    <div className="form-group" style={{"width": "35%"}}>
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

                    <Alert severity="info">Última
                        modificación: {Parser.dateToString(this.state.ultModificacion)}</Alert>
                    <br></br>

                    <h5 className="titulo">Selecciona el inicio de cada periodo del calendario</h5>
                    <h10 className="texto1">Inicio primer semestre</h10>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div style={{"margin-top": "10px"}}>

                            <Stack spacing={3} style={{"margin-top": "5px", "width": "35%"}}>
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
                        <Stack spacing={3} style={{"margin-top": "5px", "width": "35%"}}>
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
                        <Stack spacing={3} style={{"margin-top": "5px", "width": "35%"}}>
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
                        Pdf.printDocument("divToPrintId")
                    }} className="btn btn-outline-info btn-lg">DESCARGAR COMO PDF
                    </button>
                </div>
                </div>
            </div>
        );
    }
}

export default Calendario;

