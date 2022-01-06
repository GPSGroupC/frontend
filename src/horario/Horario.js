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
            //Lista de clases anhadidas al horario
            horario: [],
            //Estado de los selects del formulario
            claseSelected: {
                selectDia: "",
                selectHora: null,
                selectAsignatura: "",
                selectDuracion: null,
                selectTipo: ""
            },
            //Asignaturas disponibles
            asignaturasOptions: [],
            //Estado errores
            error: null,
            errorMessage: ""
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
        const asignaturas = [
            {"value": 302505, "label": "Fisica 1"},
            {"value": 302505, "label": "Matemáticas 2"},
            {"value": 302505, "label": "Programación 1"}
        ]
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
        var tipo = Object.values(constants.TIPO_CLASE).map((tipo) => tipo.NOMBRELARGO) //Tipo 1, tipo 2, tipo 3
        return tipo.map((t, index) => ({"value": (index + 1), "label": t}))
    }

    /**
     *
     * @returns true sii el formulario no tiene ningun campo vacio o null
     */
    formIsValid() {
        return this.state.claseSelected.selectAsignatura
            && this.state.claseSelected.selectDia
            && this.state.claseSelected.selectHora
            && this.state.claseSelected.selectDuracion
            && this.state.claseSelected.selectTipo
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
     * @param claseSelected Estado del formulario
     * Devuelve un objeto clase a partir del estado del formulario
     */
     newClase(claseSelected) {
         //El formato de hora es "15" si es en punto o "15:30" si no lo es
         let hora = (claseSelected.selectHora.getMinutes() === 0)
             ? claseSelected.selectHora.getHours().toString()
             : claseSelected.selectHora.getHours() + ":" + claseSelected.selectHora.getMinutes()
        //Objeto clase que se guarda en el horario
        let clase = {
            dia: claseSelected.selectDia.label,
            hora: hora,
            asignatura: claseSelected.selectAsignatura.label,
            duracion: claseSelected.selectDuracion.value,
            tipo: claseSelected.selectTipo.label
        }

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
            let claseAnteriorMediaHora = this.getClaseFromHorario(clase.dia, constants.RANGO_HORAS[horaIndex - 1])
            if (claseAnteriorMediaHora && (claseAnteriorMediaHora.duracion === constants.DURACION_CLASE.HORA
                || claseAnteriorMediaHora.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA)) {
                //La clase que quiero anhadir se solapa con la clase de la anterior media hora
                canAddClase = false
                console.log("candAddClase: SOLAPA con la clase de la media hora enterior")
            }
            let claseAnteriorHora = this.getClaseFromHorario(clase.dia, constants.RANGO_HORAS[horaIndex - 2])
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
                error: true,
                errorMessage: constants.MENSAJE_ERROR.CAMPO_OBLIGATORIO
            })
        } else {
            //Caso formulario rellenado correctamente
            var newClase = this.newClase(this.state.claseSelected)
            //Comprobamos que podemos anhadir la nueva clase al horario
            if(!this.canAddClase(newClase)) {
                this.setState({
                    error: true,
                    errorMessage: constants.MENSAJE_ERROR.SOLAPAMIENTO
                })
            } else {
                //Eliminamos clases repetidas y solapadas con la nueva clase a
                //anhadir
                this.state.horario = this.eliminarRedundancias(newClase)
                //Anadimos la nueva clase al horario
                this.setState({
                    error: false,
                    horario: [...this.state.horario, newClase],
                })
            }
        }
    }

    delClase(clase) {
        let horario = this.state.horario.filter((c) => c !== clase)
        this.setState({
            horario: horario,
        })
    }

    //html de la cabecera con el logo y titulo
    htmlCabecera() {
        return(
            <div>
                <div className="header">
                    <Link to="/"><img className="logoCabecera" src={eina} /></Link>
                    <Link to="/pantalla-horarios">
                        <button type="button" className="btn btn-info btn-lg">SALIR SIN GUARDAR</button>
                    </Link>
                </div>
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

    /**
     * Devuelve un alert que muestra un success message
     */
    htmlAlertSuccess() {
        return(
            <div className="elementoFormulario">
                <Alert severity="success">Clase añadida correctamente</Alert>
            </div>
        )
    }

    //html con el formulario para anhadir una asignatura
     htmlFormulario() {
        return(
            <div className="fondoFormulario">
                <p>Añade una clase al calendario</p>
                <div className="contenidoFormulario">
                    <div className="elementoFormulario">
                        <Select
                            options={this.state.asignaturasOptions}
                            placeholder={<div>Asignatura</div>}
                            onChange={(a) => {
                                this.setState(this.state.claseSelected.selectAsignatura = a);
                            } }
                            value={this.state.claseSelected.selectAsignatura} />
                    </div>
                    <div className="elementoFormulario">
                        <Select
                            options={this.getDiasOptions()}
                            placeholder={<div>Día</div>}
                            onChange={(d) => {
                                this.setState(this.state.claseSelected.selectDia = d);
                            } }
                            value={this.state.claseSelected.selectDia} />
                    </div>
                    <div className="elementoFormulario">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker style={{ boxSizing: "border-box" }}
                                        placeholder="Hora"
                                        minutesStep={30}
                                        minTime={new Date(0, 0, 0, 8)}
                                        maxTime={new Date(0, 0, 0, 20, 30)}
                                        onChange={(h) => {
                                            this.setState(this.state.claseSelected.selectHora = h);
                                        } }
                                        value={this.state.claseSelected.selectHora}
                                        renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>
                    </div>
                    <div className="elementoFormulario">
                        <Select
                            options={this.getDuracionOptions()}
                            placeholder={<div>Duración</div>}
                            onChange={(d) => {
                                this.setState(this.state.claseSelected.selectDuracion = d);
                            } }
                            value={this.state.claseSelected.selectDuracion} />
                    </div>
                    <div className="elementoFormulario">
                        <Select
                            options={this.getTipoOptions()}
                            placeholder={<div>Tipo</div>}
                            onChange={(t) => {
                                this.setState(this.state.claseSelected.selectTipo = t);
                            } }
                            value={this.state.claseSelected.selectTipo} />
                    </div>
                </div>

                <button className="btn btn-info" id="addButton" onClick={() => this.addClase()}>Añadir clase</button>

                {this.state.error === null
                    ? ""
                    : this.state.error
                        ? this.htmlAlertError(this.state.errorMessage)
                        : this.htmlAlertSuccess()}
            </div>
        )
    }

    /**
     *
     * @param hora String "8:30"
     * @param dia String "Lunes"
     * Devuelve la clase asociada a un dia y hora del horario.
     * Si no existe, devuelve undefined
     */
    getClaseFromHorario(dia, hora) {
        return this.state.horario.find(clase =>
            clase.dia == dia && clase.hora == hora
        )
    }

    /**
     *
     * @param clase
     * Devuelve el CSS asociado a cada clase segun su tipo y posicion en el horario
     */
    getCSS(clase, duracion, posicion) {
        let color
        let className
        switch (clase.tipo) {
            case constants.TIPO_CLASE.TEORIA.NOMBRELARGO:
                color =  "#d7dfe8"; break //azul
            default:
                color = "#FFFFFF"; break //blanco
        }
        if (duracion === constants.DURACION_CLASE.MEDIA_HORA) {
            className = "claseDuracionMediaHora"
        } else {
            switch (posicion) {
                case constants.POSICION.INICIO:
                    className = "clasePosicionInicio";
                    break
                case constants.POSICION.MEDIO:
                    className = "clasePosicionMedio";
                    break
                default:
                    className = "clasePosicionFin"
            }
        }

        return {className: className, color: color}
    }

    /**
     *
     * @param hora
     * @param dia
     * Devuelve el html y css asociado a una celda del horario donde puede
     * haber o no una clase insertada
     */
    htmlClase(dia, hora, horaIndex) {
        //Obtener la clase perteneciente a una hora y dia
        let clase = this.getClaseFromHorario(dia, hora)
        //Por defecto la celda no muestra nada y tiene el estilo CSS por defecto
        let nombreAsignatura = ""
        let css = {className: "celdaSinClase", color: "#FFFFFF"}

        if (clase) {
            //Caso hay una clase que empieza el dia 'dia' a la hora 'hora'
            nombreAsignatura = clase.asignatura
            css = this.getCSS(clase, clase.duracion, constants.POSICION.INICIO)
            //console.log("color: " + colorAsignatura)
        } else {
            //Obtenemos la clase asociada a la anterior media hora
            let claseAnteriorMediaHora = this.getClaseFromHorario(dia, constants.RANGO_HORAS[horaIndex - 1])
            if(claseAnteriorMediaHora) {
                //Caso hay una clase que empieza el dia 'dia' justo la media hora anterior
                if (claseAnteriorMediaHora.duracion === constants.DURACION_CLASE.HORA) {
                    //Caso la clase de la media hora anterior dura una hora
                    css = this.getCSS(claseAnteriorMediaHora, claseAnteriorMediaHora.duracion, constants.POSICION.FIN)
                } else if (claseAnteriorMediaHora.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA) {
                    //Caso la clase de la media hora anterior dura una hora y media
                    css = this.getCSS(claseAnteriorMediaHora, claseAnteriorMediaHora.duracion, constants.POSICION.MEDIO)
                }
            }
            //Obtenemos la clase asociada a la anterior hora
            let claseAnteriorHora = this.getClaseFromHorario(dia, constants.RANGO_HORAS[horaIndex - 2])
            if(claseAnteriorHora) {
                //Caso hay una clase que empieza el dia 'dia' a la hora 'hora' - 60 minutos
                if (claseAnteriorHora.duracion === constants.DURACION_CLASE.HORA_Y_MEDIA) {
                    //Caso la clase de la hora anterior dura una hora y media
                    //console.log("Clase SEGUNDO ABAJO!: " + clase.asignatura)
                    css = this.getCSS(claseAnteriorHora, claseAnteriorHora.duracion, constants.POSICION.FIN)
                    console.log("AAAA: " + css.className)
                }
            }
        }
        return (
            <td className={css.className} style={{backgroundColor: css.color}}>
                <div>
                    {nombreAsignatura}
                    {(nombreAsignatura)
                        ? <button className="btn btn-info" id="delButton" onClick={() => this.delClase(clase)}>x</button>
                        : ""
                    }
                </div>
            </td>
        )
    }

    htmlHorario() {
        return(
            <table className="timetable">
                <thead style={{fontWeight: 'bold'}}>
                <tr>
                    <td className="">Horas</td>
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
                        <td className="columnaHoras"> {
                            (horaIndex < constants.RANGO_HORAS.length - 1)
                                ? hora + " - " + constants.RANGO_HORAS[horaIndex + 1]
                                : hora + " - " + "21"
                            }
                        </td>
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
