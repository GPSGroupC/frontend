import React, {Component} from "react";
import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import {Alert} from "@material-ui/lab";
import isWeekend from 'date-fns/isWeekend';
import swal from 'sweetalert2'
import Api from "./servicios/api";
import Parser from "./utils/Parser";
import Pdf from "./utils/Pdf";
import amarillo from '../images/amarillo.png'
import verde from '../images/verde.png'
import morado from '../images/morado.png'
import blanco from '../images/blanco.png'
import eina from '../images/eina-logo.png'
import Parse from "./utils/Parser";
import constants from './utils/Constants'
import './Calendario.css';

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
            finPrimer_cuatri: null,
            finSegundo_cuatri: null,
            finSegundaConvocatoria: null,
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
            selectS1GlobalSemanaAB: [],
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
            recuperacion_changed: {dates: []},
            //Descripciones de dias festivos o de convocatoria
            description_festivo: "",
            description_convocatoria:"",
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
                //finPrimer_cuatri: r[1],
                inicioSegundo_cuatri: r[1],
                //finSegundo_cuatri: r[2],
                inicioSegundaConvocatoria: r[2],
                finSegundaConvocatoria: r[4],
                ultModificacion: r[3],
                //Dias recuperados de la libreria dates generator
                semestre1: this.getPeriodo("semestre1",r[0]?.getMonth() ?? 8, r[0]?.getFullYear() ?? 2021, 5, this.state.fechasSemestre1,r[0]),
                semestre2: this.getPeriodo("semestre2", r[1]?.getMonth() ?? 1, r[1]?.getFullYear() ?? 2022, 5, this.state.fechasSemestre2),
                recuperacion: this.getPeriodo("recuperacion",r[2]?.getMonth() ?? 8, r[2]?.getFullYear() ?? 2022, 1, this.state.fechasRecuperacion,null,[r[2],r[4]])
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

    async updateDescriptions(curso) {
        await Api.getDescriptions(curso).then(r => {
            this.setState({
                semestre1: undefined
            })
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
                semestre1: this.getPeriodo( "semestre1",8, parseInt(this.state.estadoCurso.split('-')[0]), 5, this.state.fechasSemestre1,this.state.inicioPrimer_cuatri),
            })
        })
    };

    handleChangeFinPrimerCuatri = (newValue) => {
        this.setState({
            finPrimer_cuatri: newValue,
        })
    };

    handleChangeSegundoCuatri = (newValue) => {
        this.setState({
            inicioSegundo_cuatri: newValue,
        })
    };

    handleChangeFinSegundoCuatri = (newValue) => {
        this.setState({
            finSegundo_cuatri: newValue,
        })
    };

    handleChangeSegundaConv = (newValue) => {
        this.setState({
            inicioSegundaConvocatoria: newValue,
        }, () => {
            this.setState({
                recuperacion : this.getPeriodo("recuperacion",8, parseInt(this.state.estadoCurso.split('-')[1]), 1, this.state.fechasRecuperacion,null,[this.state.inicioSegundaConvocatoria,this.state.finSegundaConvocatoria]),
            })
        })
    };

    handleChangeFinSegundaConv = (newValue) => {
        this.setState({
            finSegundaConvocatoria: newValue,
        },() => {
            this.setState({
                recuperacion : this.getPeriodo("recuperacion",8, parseInt(this.state.estadoCurso.split('-')[1]), 1, this.state.fechasRecuperacion,null,[this.state.inicioSegundaConvocatoria,this.state.finSegundaConvocatoria]),
            })
        })
    };
    handleDescriptionFestivo = (event) => {
        this.setState({
            description_festivo: event.target.value,
        })
    }

    handleDescriptionConvocatoria = (event) => {
        this.setState({
            description_convocatoria: event.target.value,
        })
    }

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
                //this.updateDescriptions(this.state.estadoCurso)
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
                        this.updateWeekAB(semestreSelected,monthIndex,weekIndex, nextValue)
                        nextValue = (nextValue == 'a') ? 'b' : 'a'
                    }
                }
            }
        } else {
            this.updateWeekAB(semestreSelected,monthIndexSelected,weekIndexSelected, null)
        }
        this.setState((state, props) => ({
        }))
    }

    /**
     *
     * @param semesterName Nombre del semestre al que pertenece monthIndex y weekIndex
     * @param monthIndex  Indice el mes en el que se encuentra la semana a actualizar
     * @param weekIndex   Indice de la semana en la que se encuentra la semana a actualizar
     * @param value       String "a" o "b"
     *
     * Actualiza los dias lectivos de una semana de un semestre como dias de tipo "semanaAB"
     * con valor "value"
     */
    updateWeekAB(semesterName, monthIndex, weekIndex, value) {
        let semester
        let semester_changed
        switch(semesterName){
            case "semestre1":
                semester = this.state.semestre1
                semester_changed = this.state.semestre1_changed
                break
            case "semestre2":
                semester = this.state.semestre2
                semester_changed = this.state.semestre2_changed
                break
            default:
                semester = this.state.recuperacion
                semester_changed = this.state.recuperacion_changed
        }

        for(let i=0; i < 5; i++){
            // Dia concreto de la semana
            let day = semester.dates[monthIndex][weekIndex][i]
            if (day.date != ' ' && day.type !== constants.TIPOS_FECHA.FESTIVO
                && day.type !== constants.TIPOS_FECHA.CONVOCATORIA) {
                //Actualizamos los dias lectivos o sin tipo asociado
                day.semanaAB = value
                day.type = constants.TIPOS_FECHA.LECTIVO
                // Agregamos el dia a la estructura de datos semestre_changed que usamos para actualizar
                // el backend solo con los dias que se modifican
                const indice = semester_changed.dates.findIndex( fecha => fecha.jsDate === day.jsDate);
                if(indice !== -1){
                    console.log("ADD EXISTING DAY: " + day.date)
                    semester_changed.dates[indice] = day
                }else{
                    console.log("ADD NEW DAY: " + day.date)
                    semester_changed.dates.push(day)
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
     * @param {fechasCuatri} Periodo recuperado de backend
     */
    getPeriodo = (semesterName, month, year, numMonths, fechasCuatri, inicioPrimerCuatri,tuplaInicioFinSeptiembre) => {
        let queryDate = {month: month, year: year, startingDay: 1}
        let acumDates = []
        let monthNames = []

        for (let i = 0; i < numMonths; i++) {
            //Obtenemos las fechas reales del calendario asociado a `queryDate`
            const {dates, nextMonth, nextYear} = datesGenerator(queryDate)
            for (let i = 0; i < dates.length; i++) {
                for (let j = 0; j < dates[i].length; j++) {
                    if (dates[i][j].month !== queryDate.month) {
                        //Escondemos todas las fechas que no pertenezcan al mes
                        dates[i][j].date = ' '
                    }
                    else if (semesterName === "recuperacion") {
                        //Ponemos que por defecto las fechas del periodo de recuperacion sean de tipo convocatoria
                        dates[i][j].type = constants.TIPOS_FECHA.CONVOCATORIA
                    }
                }
            }

            Parser.ParseDate(dates, fechasCuatri,inicioPrimerCuatri,tuplaInicioFinSeptiembre)
            if(semesterName !== "recuperacion") Parser.parseFestivos(dates);

            acumDates = [...acumDates, dates]
            monthNames = [...monthNames, constants.MONTHS[queryDate.month]]
            queryDate = {month: nextMonth, year: nextYear, startingDay: 1}
        }
        //  dates:      lista de fechas con formato: meses[ semanas[ {fecha} ] ]
        //  year:       A??o mostrado en la interfaz
        //  monthNames: lista de nombres de meses mostrados en la interfaz
        return {dates: acumDates, year: year, monthNames: monthNames}
    }

    /**
     * Handler del evento: pulsar un fecha.
     * Inicializa los checkboxs seg??n el estado interno de la fecha seleccionada
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
                this.state.description_convocatoria = date.description
                break;
            case constants.TIPOS_FECHA.FESTIVO:
                // El dia es de tipo festivo
                this.state.festivoCheckBox = true
                this.state.description_festivo = date.description
                break;
            default:
                // date.type == undefined. El dia es de tipo lectivo
                this.state.lectivoCheckBox = true
                break;
        }
        
        if (date.semanaAB != undefined) {
            // El dia lectivo pertenece a semana a/b
            this.state.semanaABcheckBox = true
            this.state.selectSemanaAB = date.semanaAB
        }
        if (date.horarioCambiado != undefined) {
            // El dia lectivo tiene horario cambiado
            this.state.horarioCambiadoCheckBox = true
            this.state.selectHorarioCambiado = date.horarioCambiado
        }

        this.setState((state, props) => ({
            selectedDate: date, //Fecha seleccionada.
            semesterSelected: tipoSemestre, //Tipo de semestre seleccionado seg??n el d??a "semestre1,2 o recus"
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
            this.state.selectedDate.description = this.state.description_convocatoria
        } else if (this.state.festivoCheckBox) {
            //Fecha seleccionada marcada como festivo
            newDateType = constants.TIPOS_FECHA.FESTIVO
            this.state.selectedDate.description = this.state.description_festivo
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

        this.setState({
            showDialog: false,
            description_festivo: "",
            description_convocatoria:"",
        });
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

    //html asociado a las descripciones mostradas a la derecha del calendario
    htmlDescriptions(week) {
        //Descripciones semanales que se tienen que mostrar en el calendario
        let descriptions = Parse.showDescriptions(week)
        //Color del icono de la descripcion. Por defecto en blanco
        let color = "#FFFFFF"
        if (descriptions) {
            //Caso esta semana tiene alguna descripcion que mostrar.
            //Actualizamos el color del icono de la descripcion semanal
            color = Parse.weekHasConvocatoria(week)
                ?  color = "#d675bd" //morado
                :  color= "#a2f29f"  //verde
        }
        return (
            <span>
                <div className="descriptionIcono" style={{backgroundColor: color}}/>
                <span className="descriptionText"> {descriptions}</span>
            </span>
        )
    }

    // html asociado a los selectores de semana en cascada que se muestran a la
    // derecha de cada semana del calendario
    htmlGlobalWeekSelector(semesterName, monthIndex, weekIndex) {
        if (semesterName !== "recuperacion") {
            return (
                <select value={this.state.selectS1GlobalSemanaAB[semesterName + "-" + monthIndex + "-" + weekIndex]}
                        id={`globalWeekSelectorAB-${monthIndex}-${weekIndex}`}
                        className={`globalWeekSelectorAB-${semesterName}`}
                        onChange={(e) => {
                            this.handleGlobalWeekAB(e, semesterName, monthIndex, weekIndex)
                        }}>
                    <option value={constants.SEMANAAB_VALORES.C}>-</option>
                    <option value={constants.SEMANAAB_VALORES.A}>a</option>
                    <option value={constants.SEMANAAB_VALORES.B}>b</option>
                </select>
            )
        }
    }
    htmlDialog() {
        return (
            <dialog open={this.state.showDialog ? true : false}>
                <div className="dialog">
                        <label>
                            <input className="checkBox" type="checkbox" id={constants.TIPOS_FECHA.CONVOCATORIA} checked={this.state.convocatoriaCheckBox}
                                   onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.CONVOCATORIA, e.target.checked)}}>
                            </input>
                            Convocatoria
                        </label>
                        {
                            this.state.convocatoriaCheckBox
                                ? <input className="inputDescriptionConvocatoria"
                                         maxLength="50"
                                         onChange={this.handleDescriptionConvocatoria}
                                         value={this.state.description_convocatoria}
                                         placeholder="A??ade una descripci??n"
                                    />
                                : void(0)
                        }
                        <label>
                            <input className="checkBox" type="checkbox" id={constants.TIPOS_FECHA.FESTIVO} checked={this.state.festivoCheckBox}
                                   onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.FESTIVO, e.target.checked)}}>
                            </input>
                            Festivo
                        </label>
                        {
                            this.state.festivoCheckBox
                                ? <input className="inputDescriptionFestivo"
                                         maxLength="50"
                                         onChange={this.handleDescriptionFestivo}
                                         value={this.state.description_festivo}
                                         placeholder="A??ade una descripci??n"
                                />
                                : void(0)
                        }

                        <label>
                            <input className="checkBox" type="checkbox" id={constants.TIPOS_FECHA.LECTIVO} checked={this.state.lectivoCheckBox}
                                   onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.LECTIVO, e.target.checked)}}>
                            </input>
                            Lectivo
                        </label>
                            <span style={{marginLeft:"50px"}}>
                                <label>
                                    <input className="checkBox" type="checkbox" id={constants.TIPOS_FECHA.SEMANAAB} checked={this.state.semanaABcheckBox}
                                           onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.SEMANAAB, e.target.checked)}}>
                                    </input>
                                    Semana
                                </label>

                                <select style={{marginLeft:"5px"}} value={this.state.selectSemanaAB}
                                        onChange={(e) => {this.setState({selectSemanaAB: e.target.value})}}>
                                    <option value={constants.SEMANAAB_VALORES.A}>a</option>
                                    <option value={constants.SEMANAAB_VALORES.B}>b</option>
                                </select>
                            </span>
                            <span style={{marginLeft:"50px"}}>
                                <label>
                                    <input className="checkBox" type="checkbox" id={constants.TIPOS_FECHA.HORARIOCAMBIADO}
                                           checked={this.state.horarioCambiadoCheckBox}
                                           onChange={(e) => {this.onSelectedCheckBox(constants.TIPOS_FECHA.HORARIOCAMBIADO, e.target.checked)}}>
                                    </input>
                                    Dia con horario cambiado a
                                </label>

                                <select style={{marginLeft:"5px"}} value={this.state.selectHorarioCambiado}
                                        onChange={(e) => {this.setState({selectHorarioCambiado: e.target.value})}}>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.LUNES}>L</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.MARTES}>M</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.MIERCOLES}>X</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.JUEVES}>J</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.VIERNES}>V</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.SABADO}>S</option>
                                    <option value={constants.HORARIOCAMBIADO_VALORES.DOMINGO}>D</option>
                                </select>
                            </span>
                </div>
                <button className="btn btn-info" id="closeDialog" onClick={() => this.onCloseDialog()}>Cerrar</button>
            </dialog>
        )
    }

    /**
     *
     * @param semestre
     * @param weekIndex
     * @param monthIndex
     * @param week
     * @returns {boolean} true sii a la semana 'week' le corresponde un numero de semana en el calendario
     */
    showNumWeek(semestre, weekIndex, monthIndex, week) {
          /*Solo devolvemos true si empieza en Lunes o es la primera semana del primer mes del semestre,
                                    para evitar que el calendario que corta las semanas cuente algunas semanas dos veces seguidas.
                                    */

            //Obtenemos el numero de la semana de la fecha dada (0,1,2,3,4)
        const startNumberWeekDay = (semestre === "semestre1")
            ? Parser.getWeekNumberFromDate(this.state.inicioPrimer_cuatri)
            : Parser.getWeekNumberFromDate(this.state.inicioSegundo_cuatri, weekIndex, week[0]);
        switch(semestre) {
                case "semestre1":
                    return Parser.devolverDiaSemana(week[0].date, week[0].month, week[0].year) === constants.DIAS_SEMANA_ENUMERADOS.LUNES
                        || (monthIndex === 0 && weekIndex - startNumberWeekDay === 0)
                case "semestre2":
                    return new Date(week[0].year, week[0].month, week[0].date) >= new Date(this.state.inicioSegundo_cuatri)
                        && Parser.devolverDiaSemana(week[0].date, week[0].month, week[0].year) === constants.DIAS_SEMANA_ENUMERADOS.LUNES
                        || (monthIndex === 0 && weekIndex - startNumberWeekDay === 0)
                default:
                    return false
            }
    }


    /**
     * Muestra una tabla con un periodo del calendario, para el primer semestre
     *
     * @param periodo   Objeto periodo que se quiere renderizar en una tabla
     */
    htmlTable(periodo, semestre) {
        var weekNum = 0
        return (
            <table className="tablaSemestre">
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
                        <td className="monthCell" rowSpan={month.length + 1} scope="rowgroup">
                            {periodo.monthNames[monthIndex]}

                        </td>
                    </tr>
                    {month.length > 0 && month.map((week, weekIndex) => (
                        (Parse.weekIsBlank(week))
                            ? ''
                            :(<tr key={JSON.stringify(week[0])} >
                            <td className="numWeek">
                                {this.showNumWeek(semestre,weekIndex,monthIndex,week,weekNum)
                                    ? weekNum= weekNum + 1
                                    : void(0)
                                }
                            </td>
                            {week.map((day, dayIndex) => (
                                <td key={JSON.stringify(day)}
                                    class={day.horarioCambiado != undefined ? "horarioCambiado" : day.type}
                                    style={{marginLeft: "15px",marginRight:'10px'}}>
                                    <div className="dateCell" onClick={() => this.onSelectDate(day, semestre)}
                                         style={{cursor: 'pointer',textAlign: 'center',marginRight:'2px', marginBottom: "5px", marginLeft: "15px"}}>
                                        {Parser.showCalendarDate(day, constants.DAYS[dayIndex])}
                                    </div>
                                    {(day === this.state.selectedDate)
                                        ?this.htmlDialog()
                                        :''
                                    }
                                </td>
                            ))}
                                {this.htmlGlobalWeekSelector(semestre, monthIndex, weekIndex)}
                                {this.htmlDescriptions(week)}
                        </tr>)
                    ))}
                    </tbody>
                ))}
            </table>

        )
    }

    htmlListaHorarioCambiado(semestre) {
        var lista_dias_horario_cambiado = Parser.getDiasConHorarioCambiado(semestre)
        if (lista_dias_horario_cambiado.length != 0) {
            return (
                <div className="descripcionHorariosCambiados">
                    <p>Cambios de d??a:</p>
                    <div className="listaHorariosCambiados">
                        {Parser.getDiasConHorarioCambiado(semestre)
                            .map((dia) => (<p>{dia}</p>))
                        }
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h4 className="titulo">EDITAR CALENDARIO GRADOS</h4>
                    <Link to="/">
                        <button type="button" className="btn btn-info btn-lg">SALIR SIN GUARDAR</button>
                    </Link>
                </div>
                <br/>
                <hr size="5px" color="black"/>
                <br/><br/>
                <div style={{marginLeft: "10%"}}>
                    <h5 className="titulo">Selecciona qu?? curso quieres editar</h5>
                    <label>Curso
                        <select value={this.state.estadoCurso} onChange={this.HandleChangeCurso} className="form-select"
                                id="exampleSelect1">
                            <option value="2021-2022">2021-2022</option>
                            <option value="2022-2023">2022-2023</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2026-2027">2026-2027</option>
                        </select>
                    </label>
                    <Alert severity="info" style={{width:"300px"}}>??ltima
                        modificaci??n: {Parser.dateToString(this.state.ultModificacion)}</Alert>
                    <br/><br/>

                    <h5 className="titulo">Selecciona el inicio de cada periodo del calendario</h5>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <label>Inicio primer semestre
                            <Stack spacing={3} className="datePicker">
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
                        </label>
                        <br></br>
                        <label>Inicio segundo semestre
                            <Stack spacing={3} className="datePicker">
                                <DesktopDatePicker
                                    label="dd/mm/yyyy"
                                    inputFormat="dd/MM/yyyy"
                                    value={this.state.inicioSegundo_cuatri}
                                    defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1], 1)}
                                    minDate={new Date("2-1-" + this.state.estadoCurso.split('-')[1])}
                                    maxDate={new Date("2-29-" + this.state.estadoCurso.split('-')[1])}
                                    onChange={this.handleChangeSegundoCuatri}
                                    shouldDisableDate={isWeekend}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </label>
                        <br></br>
                        <label>Inicio per??odo ex??menes 2?? convocatoria
                            <Stack spacing={3} className="datePicker">
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
                        </label>
                        <br></br>
                    <label>Final per??odo ex??menes 2?? convocatoria (fecha no incluida)
                            <Stack spacing={3} className="datePicker">
                                <DesktopDatePicker
                                    label="dd/mm/yyyy"
                                    inputFormat="dd/MM/yyyy"
                                    value={this.state.finSegundaConvocatoria}
                                    onChange={this.handleChangeFinSegundaConv}
                                    defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1], 8)}
                                    minDate={new Date(this.state.inicioSegundaConvocatoria)} //mayor o igual que la fecha de inicio de la segunda conv
                                    maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[1])} //no puede ser superior a la fecha de inicio del primer cuatri que viene
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </label>
                        <br></br>
                    </LocalizationProvider>

                    <h5 className="titulo">A??ade los d??as especiales pulsando directamente sobre las fechas del
                        calendario</h5>
                    <div id="divToPrintId" className="divToPrint">

                        <div className="pdfHeader">
                            <img src={eina} alt="einaLogo" width="250" height="70" style={{marginTop: '2%'}}/>
                            <p style={{marginTop: '2%'}}>EINA calendario acad??mico <br/>
                                GRADOS <br/>
                                Curso {this.state.estadoCurso} <br/>
                                ??ltima modificaci??n {
                                    ((this.state.ultModificacion !== null) &&
                                        this.state.ultModificacion?.getDate() + "/"
                                        + (this.state.ultModificacion?.getMonth() + 1) + "/"
                                        + this.state.ultModificacion?.getFullYear())}
                            </p>
                        </div>


                        <div className="calendario">
                            <div>
                                <h7 className="titulo" >Primer semestre</h7>
                                {this.htmlListaHorarioCambiado(this.state.semestre1)}
                                {this.htmlTable(this.state.semestre1,"semestre1")}
                            </div>
                            <div style={{marginTop:"20px"}}>
                                <h7 className="titulo">Segundo semestre</h7>
                                {this.htmlListaHorarioCambiado(this.state.semestre2)}
                                {//No quiteis los string de semestre1 y semestre2 y recuperacion sino en el backend va ir mal.
                                    this.htmlTable(this.state.semestre2,"semestre2")}
                            </div>
                            <div style={{marginTop:"20px"}}>
                                <h7 className="titulo">Per??odo ex??menes 2?? convocatoria</h7>
                                {this.htmlListaHorarioCambiado(this.state.recuperacion)}
                                {this.htmlTable(this.state.recuperacion,"recuperacion")}
                            </div>
                        </div>

                        <div className="leyenda">
                            <img className="leyendaIcono" src={blanco}/>
                            <p className="textoLeyenda">D??a lectivo</p>

                            <img className="leyendaIcono" style={{marginLeft: '1%'}} src={amarillo}/>
                            <p className="textoLeyenda">D??a con horario de otro d??a de la semana</p>
                        </div>

                        <div className="leyenda" style={{marginBottom:"50px"}}>
                                <img className="leyendaIcono" src={verde}/>
                                <p className="textoLeyenda">D??a festivo</p>

                                <img className="leyendaIcono" style={{marginLeft: '1%'}} src={morado}/>
                                <p className="textoLeyenda">D??a reservado para la realizaci??n de ex??menes de convocatoria</p>
                            </div>
                    </div>
                </div>
                <br/><br/>
                <div className="header">
                <Link to="/">
                    <button onClick={(e) => {
                        
                          Promise.all([
                            Api.putMetadataCalendar(this.state.inicioPrimer_cuatri,
                                this.state.inicioSegundo_cuatri,
                                this.state.inicioSegundaConvocatoria,
                                this.state.finSegundaConvocatoria,
                                this.state.estadoCurso),
                            Api.putSemester(this.state.estadoCurso, "semestre1", this.state.semestre1_changed),
                            Api.putSemester(this.state.estadoCurso, "semestre2", this.state.semestre2_changed),
                            Api.putSemester(this.state.estadoCurso, "recuperacion", this.state.recuperacion_changed),
                          ]).then(() =>{
                            swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: "Operaci??n exitosa.",
                                title: 'Cambios guardados ??xitosamente.',
                                confirmButtonText: "Vale",
                                confirmButtonColor: "#00A300",
                                showConfirmButton: true,
                                timer: 2500
                              })
                          }) 

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

