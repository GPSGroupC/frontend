import React, {Fragment, useState, useEffect, Component} from "react";
import eina from '../images/eina-logo.png'
import { Link } from 'react-router-dom'
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

const { datesGenerator } = require('dates-generator');


//Cabeceras del calendario
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
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
            inicioPrimer_cuatri:null,
            inicioSegundo_cuatri:null,
            inicioSegundaConvocatoria:null,
            estadoCurso: "2021-2022",
            //CALENDARIO
            semestre1:{dates: [], year: -1, monthNames:[]},
            semestre2:{dates: [], year: -1, monthNames:[]},
            recuperacion:{dates: [], year: -1, monthNames:[]},
            fechasSemestre1:{dates: []},
            fechasSemestre2:{dates: []},
            fechasRecuperacion:{dates: []},
            //VENTANA DE OPCIONES
            showDialog: false,
            //FECHA SELECCIONADA
            selectedDate: new Date(),
            semesterSelected: null,
            //DIAS QUE HAN CAMBIADO
            semestre1_changed:{dates: []},
            semestre2_changed:{dates: []},
            recuperacion_changed:{dates: []}
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
                semestre1: this.getPeriodo(r[0]?.getMonth() ?? 8,r[0]?.getFullYear() ?? 2021, 5,this.state.fechasSemestre1),
                semestre2: this.getPeriodo( r[1]?.getMonth() ?? 1,r[1]?.getFullYear() ?? 2022 , 5,this.state.fechasSemestre2),
                recuperacion: this.getPeriodo(r[2]?.getMonth() ?? 8,r[2]?.getFullYear() ?? 2022, 1,this.state.fechasRecuperacion)
            })
        }).catch(err => {
            console.log("Error al actualizar el calendario: ",err)
        })
    }

    /**
     * Actualiza el calendario
     *
     * @param curso {string}  Curso que se quiere actualizar.
     * @param semestre {string} Semestre del que se quiere obtener la información de los calendarios.
     */
    async updateCalendarioSemesters(curso,semestre) {
        await Api.getAllCalendarSemesterData(curso,semestre).then(response => {
            
           switch(semestre) {
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
            console.log("Error al actualizar el calendario: ",err)
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
        this.setState({ inicioPrimer_cuatri: newValue,
            semestre1: this.getPeriodo(newValue?.getMonth() ?? 8,newValue?.getFullYear() ?? 2021, 5)
        })};

    handleChangeSegundoCuatri = (newValue) => {
        this.setState({ inicioSegundo_cuatri: newValue,
            semestre2: this.getPeriodo(newValue?.getMonth() ?? 1,newValue?.getFullYear() ?? 2022, 5)
        })
    };

    handleChangeSegundaConv = (newValue) => {
        this.setState({ inicioSegundaConvocatoria: newValue,
            recuperacion: this.getPeriodo(newValue?.getMonth() ?? 8,newValue?.getFullYear() ?? 2022, 1)
        })
    };

    HandleChangeCurso =  async (curso) => { 
        this.setState({estadoCurso: curso.target.value}, () => {
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
    getPeriodo = (month, year, numMonths,fechasCuatri) => {
        // startingDay es el dia asociado a la primera fecha de cada semana
        // startingDay 0 -> Domingo
        
        let queryDate = {month: month, year: year, startingDay: 1}
        let acumDates = []
        let monthNames = []

        for (let i = 0; i < numMonths; i++) {
            const { dates, nextMonth, nextYear } = datesGenerator(queryDate)

            for(let i = 0; i <dates.length;i++){
                for(let j = 0; j < dates[i].length;j++){
                    if(dates[i][j].month !== queryDate.month){
                        dates[i][j].date= ' '
                    }
                }
            }
            Parser.parseFestivos(dates)
            Parser.ParseDate(dates,fechasCuatri)
           
            acumDates = [...acumDates,dates]
            monthNames = [...monthNames, MONTHS[queryDate.month]]
            queryDate = {month: nextMonth, year: nextYear, startingDay: 1}
        }
        //  dates:      lista de fechas con formato: meses[ semanas[ {fecha} ] ]
        //  year:       Año mostrado en la interfaz
        //  monthNames: lista de nombres de meses mostrados en la interfaz
        return { dates: acumDates, year: year, monthNames: monthNames}
    }

    /**
     * Handler del evento: pulsar un fecha.
     * Inicializa los checkboxs según el estado interno de la fecha seleccionada
     * y abre una ventana de dialogo.
     *
     * @param {Object} date     Fecha seleccionada
     */
    onSelectDate = (date,tipoSemestre) => {

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
        
       switch(this.state.semesterSelected){
           case "semestre1":
                this.state.semestre1_changed.dates.push(this.state.selectedDate)
                break;
            case "semestre2":
                this.state.semestre2_changed.dates.push(this.state.selectedDate)
                break;
            case "recuperacion":
                this.state.recuperacion_changed.dates.push(this.state.selectedDate)
                break;
       }
        
        this.setState({showDialog: false}, 
        () => {
            console.log(this.state.semestre1_changed)
            console.log(this.state.semestre2_changed)
            console.log(this.state.recuperacion_changed)
            
        });
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

    /**
     * Muestra una tabla con un periodo del calendario, para el primer semestre
     *
     * @param periodo   Objeto periodo que se quiere renderizar en una tabla
     */
    htmlTable(periodo,semestre) {
        return (
            <table style={{fontSize: 'small', marginLeft: '20px', marginRight: '20px'}}> 
                <thead style={{ fontWeight: 'bold'}}>
                <tr>
                    <td style={{ fontWeight: 'bold'}}>{periodo.year}</td>
                    {DAYS.map((day) => (
                        <td key={day}>
                            <div style={{ textAlign: 'center'}}>
                                {day}
                            </div>
                        </td>
                    ))}
                </tr>
                </thead>
                {periodo.dates.length > 0 && periodo.dates.map((month,monthIndex) => (

                    <tbody>
                    <tr>
                        <td  style={{ fontWeight: 'bold'}} rowSpan={month.length + 1} scope="rowgroup">
                            {periodo.monthNames[monthIndex]}
                            
                        </td>
                    </tr>
                    {month.length > 0 && month.map((week) => (
                        <tr key={JSON.stringify(week[0])}>
                            {week.map((day, dayIndex) => (
                                <td key={JSON.stringify(day)} class={day.horarioCambiado != undefined ? "horarioCambiado" : day.type} style={{ marginLeft:"15px" }}>
                                    <div onClick={() => this.onSelectDate(day,semestre)} style={{ textAlign: 'center', marginBottom: "5px", marginLeft:"15px"}}>
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


    //Tabla html para cada periodo del calendario
    htmlTable2(periodo) {
        return (

            <table style={{fontSize: 'small', marginLeft: '20px'}}>
                <thead style={{ fontWeight: 'bold' }}>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>{periodo.year}</td>
                    {DAYS.map((day) => (
                        <td key={day}>
                            <div style={{ textAlign: 'center'}}>
                                {day}
                            </div>
                        </td>
                    ))}
                </tr>
                </thead>
                {periodo.dates.length > 0 && periodo.dates.map((month,monthIndex) => (

                    <tbody>
                    <tr>
                        <td  style={{ fontWeight: 'bold' }} rowSpan={month.length + 1} scope="rowgroup">
                            {periodo.monthNames[monthIndex]}
                        </td>
                    </tr>
                    {month.length > 0 && month.map((week) => (
                        <tr key={JSON.stringify(week[0])}>
                            {week.map((day, dayIndex) => (
                                <td key={JSON.stringify(day)} class={day.horarioCambiado != undefined ? "horarioCambiado" : day.type} style={{ marginLeft:"15px" }}>
                                    <div onClick={() => this.onSelectDate(day,"recuperacion")} style={{ textAlign: 'center', marginLeft:"15px"}}>
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




    render () {
        return (
            <div className="filtro">

                <div>
                    <Link to="/"><img className="logoCab2" src={eina} /></Link>
                    <Link to="/">
                        <button type="button" className="btn btn-info btn-lg" style={{"margin-left": "750px", "margin-top":"15px"}}>SALIR SIN GUARDAR</button>
                    </Link>
                    <hr size="5px" color="black" />
                </div>
                <br></br><br></br><br></br> 

                <div className="filtro2">
                    <h4 className="titulo">CALENDARIO GRADOS</h4>
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
                    </div>
                    <br></br>
                </div>


                <div className="filtro2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <h10 className="texto1">Fecha de ultima modificación</h10>
                        <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                            <DesktopDatePicker
                                label="dd/mm/yyyy"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.ultModificacion}
                                readOnly={true}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>

                        <br></br>


                        <h10 className="texto1">Inicio primer semestre</h10>
                        <div style={{"margin-top":"10px"}}>
                            <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                                <DesktopDatePicker
                                    label="dd/mm/yyyy"
                                    inputFormat="dd/MM/yyyy"
                                    value={this.state.inicioPrimer_cuatri}
                                    onChange={this.handleChangePrimerCuatri}
                                    defaultCalendarMonth={ new Date(this.state.estadoCurso.split('-')[0],8)}
                                    minDate={new Date("9-1-" + this.state.estadoCurso.split('-')[0])}
                                    maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[0])}
                                    shouldDisableDate={isWeekend}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </div>

                        <br></br>
                        <h10 className="texto1">Inicio segundo semestre</h10>
                        <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                            <DesktopDatePicker
                                label="dd/mm/yyyy"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.inicioSegundo_cuatri}
                                defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1],1)}
                                minDate={new Date("2-1-" + this.state.estadoCurso.split('-')[1])}
                                maxDate={new Date("2-29-" + this.state.estadoCurso.split('-')[1])}
                                onChange={this.handleChangeSegundoCuatri}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>

                        <br></br>
                        <h10 className="texto1">Inicio período exámenes 2ª convocatoria</h10>
                        <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                            <DesktopDatePicker
                                label="dd/mm/yyyy"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.inicioSegundaConvocatoria}
                                onChange={this.handleChangeSegundaConv}
                                defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1],8)}
                                minDate={new Date("9-1-" + this.state.estadoCurso.split('-')[1])}
                                maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[1])}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div> <br></br>


                
                <div id="divToPrintId" className="divToPrint" >

                    <div className="pdfHeader"> 
                        <img src={eina} alt="einaLogo" width="250" height="70" style={{ marginTop: '2%' }}/>
                        <p style={{ marginTop: '2%' }}>EINA calendario académico <br/>
                            GRADOS <br/>
                            Curso {this.state.estadoCurso} <br/>
                            Última modificación {
                                ((this.state.ultModificacion !== null) &&
                                this.state.ultModificacion?.getDate() + "/"
                                + (this.state.ultModificacion?.getMonth() + 1) + "/"
                                + this.state.ultModificacion?.getFullYear())}
                        </p>
                    </div>


                    {this.htmlDialog()}
                    <table>
                        <tbody>
                        <tr>
                            <td style={{"width":"100%", "height":"10%"}}>
                                <h7 className="titulo" style={{ marginLeft: '24%' }}>Primer semestre</h7>
                                {this.htmlTable(this.state.semestre1)}
                            </td>

                            <td style={{"width":"100%", "height":"10%"}}>
                                <h7 className="titulo" style={{ marginLeft: '26%' }}>Segundo semestre</h7>
                                {this.htmlTable(this.state.semestre2)}
                            </td>

                           
                        </tr>
                        </tbody>

                    </table>

                    <br></br>
                    <h7 className="titulo" style={{ marginTop: '5%', marginLeft: '13.5%' }}>Período exámenes 2ª convocatoria</h7>
                    {this.htmlTable2(this.state.recuperacion)}
                    <br></br>
                    
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

                            <img className="leyenda" style={{marginLeft: '1%' }} src={morado}/>
                            <p id="textoLeyenda">Día reservado para la realización de exámenes de convocatoria</p>
                        </span>                    
                    </div>

                </div>
            

                <div className="printButton" style={{marginTop:'20px'}}>
                    <button onClick={() => {Pdf.printDocument("divToPrintId")}} className="btn btn-outline-info btn-lg" style={{"margin-left": "45%"}}>Descargar</button>
                </div>

                <Link to="/">
                    <button onClick={() => {Api.putAllCalendarData(this.state.inicioPrimer_cuatri,
                        this.state.inicioSegundo_cuatri,
                        this.state.inicioSegundaConvocatoria,
                        this.state.estadoCurso);
                        //Api.putSemester(this.state.estadoCurso, "semestre1", this.state.semestre1)
                        Api.putSemester(this.state.estadoCurso, "semestre1", this.state.semestre1_changed)
                        Api.putSemester(this.state.estadoCurso, "semestre2", this.state.semestre2_changed)
                        Api.putSemester(this.state.estadoCurso, "recuperacion", this.state.recuperacion_changed)
                    }} type="button" className="btn btn-info btn-lg" style={{"margin-left": "45%"}}>GUARDAR</button>
                </Link>

                
            </div>
        );
    }
}

export default Calendario;

