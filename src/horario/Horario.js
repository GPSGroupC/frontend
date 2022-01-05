import React, {Component, useState, Fragment} from "react";
import Select from 'react-select'
import {LocalizationProvider, TimePicker} from "@mui/lab";
import {TextField} from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import eina from "../images/eina-logo.png";
import './Horario.css'
import constants from "./utils/Constants";

class Horario extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            //Estado de la clase seleccionada
            claseSelected: {
                dia: "",
                hora: null,
                asignatura: "",
                duracion: null,
                tipo: ""
            },
            //Clases insertadas en el horario
            horario: [
                {
                    dia: "Lunes",
                    hora: "8",
                    asignatura: "Naturales",
                    duracion: 90,
                    tipo: constants.TIPO_CLASE.TEORIA.NOMBRELARGO
                },
            ],
            //Asignaturas disponibles
            asignaturasOptions: [],
            //Estado del formulario
            formError: false,
            formErrorMessage: ""
        }
    }

    
    componentDidMount() {
        this.getAsignaturasOptions()
    }

    /**
     *
     * @returns [Object] las opciones del select 'Asignatura'
     */
    async getAsignaturasOptions() {
        //const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        //const data = res.data

        /*const asignaturas = data.map(d => ({
            "value" : d.id,
            "label" : d.name
        }))*/
        const asignaturas = [{"value": 302505, "label": "Fisica 1"}]
        this.setState({asignaturasOptions: asignaturas})
    }

    /**
     *
     * @returns [Object] las opciones del select 'dia'
     */
    getDiasOptions() {
        var dias = constants.DAYS
        return dias.map((d) => ({"value": d, "label": d}))
    }

    /**
     *
     * @returns [Object] las opciones del select 'duracion'
     */
    getDuracionOptions() {
        var duracion = [30, 60, 90]
        return duracion.map((d) => ({"value": d, "label": `${d} minutos`}))
    }

    /**
     *
     * @returns [Object] las opciones del select 'tipo'
     */
    getTipoOptions() {
        var tipo = [
            constants.TIPO_CLASE.TEORIA.NOMBRELARGO,
            constants.TIPO_CLASE.PROBLEMAS.NOMBRELARGO,
            constants.TIPO_CLASE.PRACTICAS.NOMBRELARGO] //Tipo 1, tipo 2, tipo 3
        return tipo.map((t, index) => ({"value": (index + 1), "label": t}))
    }

    /**
     *
     * @returns true sii la clase seleccionada no tiene ningun campo vacio o null
     */
    formIsValid() {
        return this.state.claseSelected.asignatura
            && this.state.claseSelected.dia
            && this.state.claseSelected.hora
            && this.state.claseSelected.duracion
            && this.state.claseSelected.tipo
    }

    /**
     *
     * @param claseA Una clase de universidad. Formato:{dia,hora,asignatura,duracion,tipo}
     * @param claseB Una clase de universidad. Formato:{dia,hora,asignatura,duracion,tipo}
     * @returns true sii las asignaturas y el tipo de cada clase son iguales.
     */
    asignaturasIguales(claseA, claseB) {
        return claseA.asignatura == claseB.asignatura && claseA.tipo == claseB.tipo
    }

    /**
     *
     * @param claseA Una clase de universidad. Formato:{dia,hora,asignatura,duracion,tipo}
     * @param claseB Una clase de universidad. Formato:{dia,hora,asignatura,duracion,tipo}
     * @returns true sii la claseA se solapa en el tiempo con la clase B
     */
    clasesSolapadas(claseA, claseB) {
        return claseA.dia == claseB.dia && claseA.hora == claseB.hora
    }

    /**
     *
     * @param new_clase Una clase de universidad que se va a añaidir al horario
     * @returns Devuelve un horario sin redundancias.
     *          Redundancias detectadas:
     *              Puede existir en el horario una asignatura igual que la que se quiere añadir.
     *              Puede existir en el horario una clase solapada en el tiempo con la que se quiere añadir.
     */
    eliminarRedundancias(new_clase) {
        return this.state.horario.filter(
            (clase) => !this.asignaturasIguales(clase, new_clase)
                && !this.clasesSolapadas(clase, new_clase)
        );
    }

    /**
     *
     * @param claseSelected Objeto que guarda el estado del formulario
     * Devuelve un objeto clase
     */
     newClase(claseSelected) {
         var hora = (claseSelected.hora.getMinutes() === 0)
             ? claseSelected.hora.getHours().toString()
             : claseSelected.hora.getHours() + ":" + claseSelected.hora.getMinutes()
         var clase = {
            dia: claseSelected.dia.label,
            hora: hora,
            asignatura: claseSelected.asignatura.label,
            duracion: claseSelected.duracion.value,
            tipo: claseSelected.tipo.label
        }
        //console.log("newclse: " + claseSelected.dia.label)
        return clase
    }

    /**
     * Devuelve true si es posible anhadir una nueva clase al horario
     */
    canAddClase(clase) {
        let canAddClase = true
        if (clase) {
            console.log("candAddClase: clase NO es undefined")
            let horaIndex = constants.RANGO_HORAS.findIndex((hora) => hora === clase.hora)
            //Clase del horario situada en la anterior media hora
            let claseAnteriorMediaHora = this.getClase(clase.dia, constants.RANGO_HORAS[horaIndex - 1])
            if (claseAnteriorMediaHora && (claseAnteriorMediaHora.duracion === constants.DURACION_CLASE.HORA
                || claseAnteriorMediaHora.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA)) {
                //La clase que quiero anhadir se solapa con la clase de la anterior media hora
                canAddClase = false
                console.log("candAddClase: SOLAPA con la clase de la media hora enterior")
            }
            let claseAnteriorHora = this.getClase(clase.dia, constants.RANGO_HORAS[horaIndex - 2])
            if (claseAnteriorHora && (claseAnteriorHora.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA)) {
                // La clase que quiero anhadir se solapa con la clase de la anterior hora
                canAddClase = false
                console.log("candAddClase: SOLAPA con la clase de la hora enterior")
            }

        } else {
            console.log("candAddClase: clase es undefined")
            canAddClase = false
        }

        return canAddClase
    }

    /**
     * Gestiona el evento anhadir la clase seleccionada al horario
     */
    addClase() {
        //Chequear que la clase seleccionada por el usuario es valida
        if (!this.formIsValid()) {
            this.setState({
                formError: true,
                formErrorMessage: constants.MENSAJE_ERROR.CAMPO_OBLIGATORIO
            })
        } else {
            //Caso formulario rellenado correctamente
            var newClase = this.newClase(this.state.claseSelected)
            //Comprobamos que podemos anhadir la nueva clase al horario
            if(!this.canAddClase(newClase)) {
                this.setState({
                    formError: true,
                    formErrorMessage: constants.MENSAJE_ERROR.SOLAPAMIENTO
                })
            } else {
                //Eliminamos clases repetidas y solapadas con la nueva clase a
                //anhadir
                this.state.horario = this.eliminarRedundancias(newClase)
                //Anadimos la nueva clase al horario
                this.setState({
                    formError: false,
                    horario: [...this.state.horario, newClase],
                })
            }
        }
    }

    //html de la cabecera con el logo y titulo
    htmlCabecera() {
        return(
            <div>
                <Link to="/"><img className="logoCabecera" src={eina} /></Link>
                <Link to="/">
                    <button type="button" className="btn btn-info btn-lg" style={{ "margin-left": "750px", "margin-top": "15px" }}>SALIR SIN GUARDAR</button>
                </Link>
                <hr size="5px" color="black" />
            </div>
        )
    }

    /**
     *
     * @param error String con un mensaje de error
     * Devuelve un alert que muestra un mensaje de error
     */
    htmlAlertError(error) {
        return(
            <div className="elementoFormulario">
                <Alert severity="error">{error}</Alert>
            </div>
        )
    }

    //html con el formulario para anhadir una asignatura
     htmlFormulario() {
        return(
            <div className="fondoFormulario">
                <p>Añadir asignatura</p>
                <div className="contenidoFormulario">
                    <div className="elementoFormulario">
                        <Select
                            options={this.state.asignaturasOptions}
                            placeholder={<div>Asignatura</div>}
                            onChange={(a) => {
                                this.setState(this.state.claseSelected.asignatura = a);
                            } }
                            value={this.state.claseSelected.asignatura} />
                    </div>
                    <div className="elementoFormulario">
                        <Select
                            options={this.getDiasOptions()}
                            placeholder={<div>Día</div>}
                            onChange={(d) => {
                                this.setState(this.state.claseSelected.dia = d);
                            } }
                            value={this.state.claseSelected.dia} />
                    </div>
                    <div className="elementoFormulario">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker style={{ boxSizing: "border-box" }}
                                        placeholder="Hora"
                                        minutesStep={30}
                                        minTime={new Date(0, 0, 0, 8)}
                                        maxTime={new Date(0, 0, 0, 20, 30)}
                                        onChange={(h) => {
                                            this.setState(this.state.claseSelected.hora = h);
                                        } }
                                        value={this.state.claseSelected.hora}
                                        renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>
                    </div>
                    <div className="elementoFormulario">
                        <Select
                            options={this.getDuracionOptions()}
                            placeholder={<div>Duración</div>}
                            onChange={(d) => {
                                this.setState(this.state.claseSelected.duracion = d);
                            } }
                            value={this.state.claseSelected.duracion} />
                    </div>
                    <div className="elementoFormulario">
                        <Select
                            options={this.getTipoOptions()}
                            placeholder={<div>Tipo</div>}
                            onChange={(t) => {
                                this.setState(this.state.claseSelected.tipo = t);
                            } }
                            value={this.state.claseSelected.tipo} />
                    </div>
                </div>

                <button className="btn btn-info" onClick={() => this.addClase()}>Añadir</button>

                {this.state.formError
                    ? this.htmlAlertError(this.state.formErrorMessage)
                    : ''}
            </div>
        )
    }

    /**
     *
     * @param hora String "8:30"
     * @param dia String "Lunes"
     * Devuelve la clase asociada a un dia y hora.
     * Si no existe, devuelve undefined
     */
    getClase(dia, hora) {
        return this.state.horario.find(clase =>
            clase.dia == dia && clase.hora == hora
        )
    }

    getColorClase(clase) {
        switch (clase.tipo) {
            case constants.TIPO_CLASE.TEORIA.NOMBRELARGO:
                return "#d7dfe8" //Azul
            default:
                return "#FFFFFF" //Blanco
        }
    }

    /**
     *
     * @param hora
     * @param dia
     * Devuelve una celda html con la asignatura perteneciente
     * a un dia y hora del horario
     */
    htmlClase(dia, hora, horaIndex) {
        //Obtener la clase perteneciente a una hora y dia
        let clase = this.getClase(dia, hora)
        //Por defecto la celda no muestra nada y es de color blanco
        let nombreAsignatura = ""
        let colorAsignatura = "#FFFFFF"

        if (clase) {
            //console.log("Clase MATCH!: " + clase.asignatura + " " + clase.duracion)
            //Caso hay una clase que empieza el dia 'dia' a la hora 'hora'
            nombreAsignatura = clase.asignatura
            colorAsignatura = this.getColorClase(clase)
            //console.log("color: " + colorAsignatura)
        } else {
            //Obtenemos la clase asociada a la anterior media hora
            clase = this.getClase(dia, constants.RANGO_HORAS[horaIndex - 1])
            if(clase) {
                //Caso hay una clase que empieza el dia 'dia' a la hora 'hora' - 30 minutos
                if (clase.duracion === constants.DURACION_CLASE.HORA
                    || clase.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA) {
                    //Caso la clase de la media hora anterior dura una hora o una hora y media
                    //console.log("Clase PRIMER ABAJO!: " + clase.asignatura)
                    colorAsignatura = this.getColorClase(clase)
                }
            }
            //Obtenemos la clase asociada a la anterior hora
            clase = this.getClase(dia, constants.RANGO_HORAS[horaIndex - 2])
            if(clase) {
                //Caso hay una clase que empieza el dia 'dia' a la hora 'hora' - 60 minutos
                if (clase.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA) {
                    //Caso la clase de la hora anterior dura una hora y media
                    //console.log("Clase SEGUNDO ABAJO!: " + clase.asignatura)
                    colorAsignatura = this.getColorClase(clase)
                }
            }
        }
        return (
            <td style={{backgroundColor: colorAsignatura}}>{nombreAsignatura}</td>
        )
    }

    htmlHorario() {
        return(
            <table className="timetable">
                <thead style={{fontWeight: 'bold'}}>
                <tr>
                    <td className="columnaHoras">Horas</td>
                    {constants.DAYS.map((day) => (
                        <td key={day} >
                            <div style={{textAlign: 'center'}}>
                                {day}
                            </div>
                        </td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {constants.RANGO_HORAS.map((hora, horaIndex) => (
                    <tr>
                        <td> {hora}</td>
                        {this.htmlClase(constants.DIAS_SEMANA.LUNES, hora,horaIndex)}
                        {this.htmlClase(constants.DIAS_SEMANA.MARTES, hora,horaIndex)}
                        {this.htmlClase(constants.DIAS_SEMANA.MIERCOLES, hora,horaIndex)}
                        {this.htmlClase(constants.DIAS_SEMANA.JUEVES, hora,horaIndex)}
                        {this.htmlClase( constants.DIAS_SEMANA.VIERNES, hora,horaIndex)}
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
    render() {
        return (
            <div>
                {this.htmlCabecera()}
                {this.htmlFormulario()}
                {this.htmlHorario()}

            </div>

        )

    }
}

export default Horario;
