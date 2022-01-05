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
                    duracion: 30,
                    tipo: "teoria"
                },
            ],
            //Asignaturas disponibles
            asignaturasOptions: [],
            //Estado del formulario
            formError: false
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
        var tipo = ["teoría", "problemas", "prácticas"] //Tipo 1, tipo 2, tipo 3
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
            duracion: claseSelected.duracion,
            tipo: claseSelected.tipo
        }
        console.log("newclse: " + claseSelected.dia.label)
        return clase
    }

    /**
     * Gestiona el evento anhadir la clase seleccionada al horario
     */
    addClase() {
        //Chequear que la clase seleccionada por el usuario es valida
        if (!this.formIsValid()) {
            this.setState({formError: true})
            return
        } else {
            //Caso formulario rellenado correctamente
            var newClase = this.newClase(this.state.claseSelected)
            //Eliminamos solapamientos entre clases y asignaturas repetidas
            this.state.horario = this.eliminarRedundancias(newClase)
            //Anadimos la nueva clase al horario
            this.setState({
                formError: false,
                horario: [...this.state.horario, newClase],
            })
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
                    ? (<div className="elementoFormulario"><Alert severity="error">Algún campo está vacío — ¡Todos son
                        obligatorios!</Alert></div>)
                    : ''}
            </div>
        )
    }

    /**
     *
     * @param hora
     * @param dia
     * Devuelve una celda html con la asignatura perteneciente
     * a un dia y hora del horario
     */
    htmlClase(hora, dia) {
        let clase =  this.state.horario.find(clase =>
             clase.hora == hora && clase.dia == dia
        )
        return(
            <td>{(clase) ? clase.asignatura : ""}</td>
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
                {constants.RANGO_HORAS.map((hora, index) => (
                    <tr>
                        <td> {hora}</td>
                        {this.htmlClase(hora, constants.DIAS_SEMANA.LUNES)}
                        {this.htmlClase(hora, constants.DIAS_SEMANA.MARTES)}
                        {this.htmlClase(hora, constants.DIAS_SEMANA.MIERCOLES)}
                        {this.htmlClase(hora, constants.DIAS_SEMANA.JUEVES)}
                        {this.htmlClase(hora, constants.DIAS_SEMANA.VIERNES)}
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
