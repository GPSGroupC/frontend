import React, {Component} from "react";
import Select from 'react-select'
import {LocalizationProvider, TimePicker} from "@mui/lab";
import {TextField} from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import eina from "../images/eina-logo.png";

class Horario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Estado de la clase seleccionada
            claseSelected: {
                "dia": "",
                "hora": null,
                "asignatura": "",
                "duracion": null,
                "tipo": ""
            },
            //Clases insertadas en el horario
            horario_changed: [],
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
        var dias = ["L", "M", "M", "J", "V", "S", "D"]
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
        return this.state.horario_changed.filter(
            (clase) => !this.asignaturasIguales(clase, new_clase)
                && !this.clasesSolapadas(clase, new_clase)
        );
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
            //Eliminamos solapamientos entre clases y asignaturas repetidas
            this.state.horario_changed = this.eliminarRedundancias(this.state.claseSelected)
            //Anadimos la nueva clase al horario
            this.state.horario_changed.push(this.state.claseSelected)
            this.setState({formError: false})
        }
    }

    render() {

        return (
            <div>
                <div className="HorarioSeleccion">
                    <Link to="/">
                        <img className="logoCabAux" src={eina} style={{"margin-right": "1100px"}}/>
                    </Link>
                    <hr size="5px" color="black"/>
                    <br></br>
                </div>
                <div style={{
                    display: "block",
                    margin: "auto",
                    width: "50%",
                    border: "1px solid #b8b894",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "4px 5px 4px -3px rgba(97,97,97,1)"
                }}>
                    <p>Añadir asignatura</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "auto",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        <div style={{margin: "6px"}}>
                            <Select
                                options={this.state.asignaturasOptions}
                                placeholder={<div>Asignatura</div>}
                                onChange={(a) => {
                                    this.setState(this.state.claseSelected.asignatura = a)
                                }}
                                value={this.state.claseSelected.asignatura}
                            />
                        </div>
                        <div style={{margin: "6px"}}>
                            <Select
                                options={this.getDiasOptions()}
                                placeholder={<div>Día</div>}
                                onChange={(d) => {
                                    this.setState(this.state.claseSelected.dia = d)
                                }}
                                value={this.state.claseSelected.dia}
                            />
                        </div>
                        <div style={{margin: "6px"}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker style={{boxSizing: "border-box"}}
                                            placeholder="Hora"
                                            minutesStep={30}
                                            minTime={new Date(0, 0, 0, 8)}
                                            maxTime={new Date(0, 0, 0, 20, 30)}
                                            onChange={(h) => {
                                                this.setState(this.state.claseSelected.hora = h)
                                            }}
                                            value={this.state.claseSelected.hora}
                                            renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{margin: "6px"}}>
                            <Select
                                options={this.getDuracionOptions()}
                                placeholder={<div>Duración</div>}
                                onChange={(d) => {
                                    this.setState(this.state.claseSelected.duracion = d)
                                }}
                                value={this.state.claseSelected.duracion}
                            />
                        </div>
                        <div style={{margin: "6px"}}>
                            <Select
                                options={this.getTipoOptions()}
                                placeholder={<div>Tipo</div>}
                                onChange={(t) => {
                                    this.setState(this.state.claseSelected.tipo = t)
                                }}
                                value={this.state.claseSelected.tipo}
                            />
                        </div>
                    </div>
                    <button className="btn btn-info" id="closeDialog" onClick={() => this.addClase()}>Añadir
                    </button>
                    {this.state.formError
                        ? (<div style={{marginTop: "6px"}}><Alert severity="error">Algún campo está vacío — ¡Todos son
                            obligatorios!</Alert></div>)
                        : ''}
                </div>
            </div>

        )

    }
}

export default Horario;
