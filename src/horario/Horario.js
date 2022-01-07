import React, {Component, useState, Fragment} from "react";
import Select from 'react-select'
import {LocalizationProvider, TimePicker} from "@mui/lab";
import {TextField} from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import eina from "../images/eina-logo.png";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
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
            errorMessage: "",
            //Drag & Drop
            dragSrcEl: null,
            origen_accion: constants.ACCION_ORIGEN.INSERTAR,
            diaOrigenAlMover: null,
            horaOrigenAlMover: null,
        }
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
    /*eliminarRedundancias(new_clase) {
        return this.state.horario.filter(
            (clase) => !this.asignaturasIguales(clase, new_clase)
                && !this.clasesSolapadas(clase, new_clase)
        );
    }*/

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
     * Devuelve true sii la clase a insertar en el horario 'newClase'
     * se solaparia con otra clase del horario
     */
    haySolapamiento(newClase) {
        let indexHora = constants.RANGO_HORAS.findIndex((hora) => hora === newClase.hora)
        return this.solapamientoHoraActual(newClase,indexHora)
            || this.solapamientoMediaHoraAnterior(newClase, indexHora)
            || this.solapamientoHoraAnterior(newClase, indexHora)
            || this.solapamientoMediaHoraSiguiente(newClase, indexHora)
            || this.solapamientoHoraSiguiente(newClase, indexHora)
    }

    /**
     *
     * @param newClase Clase que se quiere insertar en el horario
     * @param indexHora Indice de RANGO_HORAS donde se quiere insertar 'newClase'
     *
     * Devuelve true sii 'newClase' se solaparia con una clase del horario que empieza
     * a la misma hora
     */
    solapamientoHoraActual(newClase, indexHora) {
        let claseHoraActual = this.getClaseFromHorario(newClase.dia, constants.RANGO_HORAS[indexHora])
        return !!(claseHoraActual)
    }

    /**
     *
     * @param newClase Clase que se quiere insertar en el horario
     * @param indexHora Indice de RANGO_HORAS donde se quiere insertar 'newClase'
     *
     * Devuelve true sii 'newClase' se solaparia con la clase que empieza
     * una hora antes
     */
    solapamientoMediaHoraAnterior(newClase, indexHora) {
        let claseMediaHoraAnterior= this.getClaseFromHorario(newClase.dia, constants.RANGO_HORAS[indexHora - 1])
        return (claseMediaHoraAnterior && (claseMediaHoraAnterior.duracion > constants.DURACION_CLASE.MEDIA_HORA))
    }

    /**
     *
     * @param newClase Clase que se quiere insertar en el horario
     * @param indexHora Indice de RANGO_HORAS donde se quiere insertar 'newClase'
     *
     * Devuelve true sii 'newClase' se solaparia con la clase que empieza
     * media hora antes
     */
    solapamientoHoraAnterior(newClase, indexHora) {
        let claseHoraAnterior= this.getClaseFromHorario(newClase.dia, constants.RANGO_HORAS[indexHora - 2])
        return (claseHoraAnterior && (claseHoraAnterior.duracion > constants.DURACION_CLASE.HORA))
    }
    /**
     *
     * @param newClase Clase que se quiere insertar en el horario
     * @param indexHora Indice de RANGO_HORAS donde se quiere insertar 'newClase'
     *
     * Devuelve true sii 'newClase' se solaparia con la clase que empieza
     * media hora despues
     */
    solapamientoMediaHoraSiguiente(newClase, indexHora) {
        let claseMediaHoraSiguiente= this.getClaseFromHorario(newClase.dia, constants.RANGO_HORAS[indexHora + 1])
        return (claseMediaHoraSiguiente && (newClase.duracion > constants.DURACION_CLASE.MEDIA_HORA))
    }

    /**
     *
     * @param newClase Clase que se quiere insertar en el horario
     * @param indexHora Indice de RANGO_HORAS donde se quiere insertar 'newClase'
     *
     * Devuelve true sii 'newClase' se solaparia con la clase que empieza
     * una hora despues.
     */
    solapamientoHoraSiguiente(newClase, indexHora) {
        let claseHoraSiguiente= this.getClaseFromHorario(newClase.dia, constants.RANGO_HORAS[indexHora + 2])
        return (claseHoraSiguiente && (newClase.duracion > constants.DURACION_CLASE.HORA))
    }



    /**
     * Devuelve true si es posible anhadir una nueva clase al horario
     */
    canAddClase(clase) {
        if (clase) {
            return !this.haySolapamiento(clase)
        } else {
            return false
        }
    }

    /**
     * Gestiona el evento anhadir la clase seleccionada al horario
     */
    addClase(clase) {
        let newClase
        if (!clase) {
            //Caso obtenemos el objeto clase desde formulario
            if (!this.formIsValid()) {
                this.setState({
                    error: true,
                    errorMessage: constants.MENSAJE_ERROR.CAMPO_OBLIGATORIO
                })
            } else {
                //Caso formulario rellenado correctamente
                 newClase = this.newClase(this.state.claseSelected)
            }
        }
        else {
            //Caso obtenemos el objeto clase como argumento
            newClase = clase
        }

        //Comprobamos que podemos anhadir la nueva clase al horario
        if(!this.canAddClase(newClase)) {
            this.setState({
                error: true,
                errorMessage: constants.MENSAJE_ERROR.SOLAPAMIENTO
            })
        } else {
            //Eliminamos clases repetidas y solapadas con la nueva clase a
            //anhadir
            //this.state.horario = this.eliminarRedundancias(newClase)
            //Anadimos la nueva clase al horario
            this.setState({
                error: false,
                horario: [...this.state.horario, newClase],
            })
        }
    }

    moveClase = (claseDestino) => {
        if (claseDestino && !this.haySolapamiento(claseDestino)) {
            //La clase a mover no se solapa con ninguna otra
            if (this.state.diaOrigenAlMover && this.state.horaOrigenAlMover) {
                //El dia y hora de la clase que se ha movido no son null
                let claseOrigen = this.getClaseFromHorario(this.state.diaOrigenAlMover, this.state.horaOrigenAlMover)
                this.setState({
                    error: false,
                    horario: [...this.delClaseFromHorario(claseOrigen), claseDestino],
                })
            } else {
                console.log("moveClase: diaOrigen o HoraOrigen undefined")
            }
        } else {
            this.setState({
                error: true,
                errorMessage: constants.MENSAJE_ERROR.SOLAPAMIENTO
            })
        }
    }



    handleDelClase = (e, clase) => {
        e.stopPropagation(); // Hace que el html padre no expanda su comportamiento onClick en este boton
        this.setState({
            horario:  this.delClaseFromHorario(clase),
        })
    }

    //html de la cabecera con el logo y titulo
    htmlCabecera() {
        return(
            <div>
                <div className="header">
                    <Link to="/"><img className="logoCabecera" src={eina} /></Link>
                    <h4 className="titulo">EDITAR HORARIO</h4>
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
     htmlCard() {
        return(
            <div className="fondoCard">
                <p>Arrastra una clase al horario</p>
                <div className="contenidoCard">
                    <p style={{fontWeight: "bold"}}>Cases teóricas:</p>
                    <div className="asignaturas">
                        <div className="asignatura"
                             draggable="true"
                             onDragStart={this.handleDragStartInsertar}
                             onDragEnd={this.handleDragEnd}>
                            <DragIndicatorIcon></DragIndicatorIcon>
                            Física 1 </div>
                        <div className="asignatura"
                             draggable="true"
                             onDragStart={this.handleDragStartInsertar}
                             onDragEnd={this.handleDragEnd}>
                            <DragIndicatorIcon></DragIndicatorIcon>
                            Programación 1 </div>
                        <div className="asignatura"
                             draggable="true"
                             onDragStart={this.handleDragStartInsertar}
                             onDragEnd={this.handleDragEnd}>
                            <DragIndicatorIcon></DragIndicatorIcon>
                            Matemáticas 1 </div>
                        <div className="asignatura"
                             draggable="true"
                             onDragStart={this.handleDragStartInsertar}
                             onDragEnd={this.handleDragEnd}>
                            <DragIndicatorIcon></DragIndicatorIcon>
                            Matemáticas 2 </div>
                        <div className="asignatura"
                             draggable="true"
                             onDragStart={this.handleDragStartInsertar}
                             onDragEnd={this.handleDragEnd}>
                            <DragIndicatorIcon></DragIndicatorIcon>
                            Introducción a los computadores</div>
                    </div>
                </div>
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

    delClaseFromHorario(clase) {
        console.log("delClase")
        let horario = this.state.horario.filter((c) => c !== clase)
        horario.map((clase) => console.log("HORARIO: " + clase.asignatura +" "+clase.hora))

        return horario
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
            <td className={css.className}
                id={dia + " " + hora}
                style={{backgroundColor: css.color, cursor:(nombreAsignatura) ? "move" : "default"}}
                draggable={(nombreAsignatura) ? "true" : "false"}
                onDragStart={(e) => this.handleDragStartMover(e, dia, hora)}
                onDragEnd={this.handleDragEnd}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={(e) => this.handleDrop(e,dia,hora)}
                onClick={() => this.handleClick(dia, hora)}
            >
                <div>
                    {nombreAsignatura}
                    {(nombreAsignatura)
                        ? <button style={{padding:"0px", backgroundColor:"white", color:"dimgrey"}}
                                  id="delButton"
                                  onClick={(e) => this.handleDelClase(e, clase)}
                        >
                            <DeleteSharpIcon></DeleteSharpIcon>
                        </button>
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

    /**
     * Devuelve un valor del rango [30, 60, 90]
     * siguiendo la secuencia round-robin
     */
    roundRobin(duracion) {
        let newDuracion = (duracion === 90)
            ? 30
            : duracion + 30
        return newDuracion
    }

    /**
     * Modifica la duracion de una clse
     */
    changeDuration(clase) {
        clase.duracion = this.roundRobin(clase.duracion)
    }

    /**
     * Evento clicar en una clase del horario.
     * Aumenta la duracion de la clase
     */
    handleClick = (dia, hora) => {
        // Obtenemos la clase que hemos clicado en el horario
        let clase = this.getClaseFromHorario(dia, hora)
        if(clase) {
            let duracionBackup = clase.duracion
            let indexHora = constants.RANGO_HORAS.findIndex((hora) => hora === clase.hora)
            //Cambiamos la duracion de la clase seleccionada
            this.changeDuration(clase)
            if (this.solapamientoMediaHoraSiguiente(clase,indexHora)
                || this.solapamientoHoraSiguiente(clase, indexHora)) {
                // NO SE PUEDE AUMENTAR LA DURACION -> ROLLBACK
                clase.duracion = duracionBackup
            } else {
                // SE PUEDE AUMENTAR LA DURACION
                this.setState({})
            }
        }
        this.state.horario.map((clase) => console.log("HORARIO:" + clase.asignatura + " " + clase.duracion))
    }
    /*Drag&Drop*/

    componentDidMount() {
        this.getAsignaturasOptions()
    }

    /**
     * Empezar a arrastrar una clase desde fuera para insertarla
     * en el horario
     */
    handleDragStartInsertar = (e) =>{
        e.target.style.opacity = '0.4';

        this.state.dragSrcEl = e.target
        this.state.origen_accion = constants.ACCION_ORIGEN.INSERTAR
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target.textContent)
    }
    /**
     * Empezar a arrastrar una clase del horario para moverla a otra
     * posicion del horario
     */
    handleDragStartMover = (e, dia, hora) => {
        e.target.style.opacity = '0.4';
        this.state.dragSrcEl = e.target
        this.state.origen_accion = constants.ACCION_ORIGEN.MOVER
        this.state.diaOrigenAlMover = dia
        this.state.horaOrigenAlMover = hora
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target.textContent)
    }

    handleDrop = (e, dia, hora) => {
        e.stopPropagation(); // Evita redireccion del navegador.

        if(this.state.dragSrcEl != e.target) {
            //this.state.dragSrcEl.innerHTML = e.target.innerHTML
            //e.target.textContent = e.dataTransfer.getData('text/html')
            let asignatura = e.dataTransfer.getData('text/html')
            let clase = {
                dia: dia,
                hora: hora,
                asignatura: asignatura,
                duracion: 30,
                tipo: constants.TIPO_CLASE.TEORIA.NOMBRELARGO
            }
            switch(this.state.origen_accion) {
                case constants.ACCION_ORIGEN.INSERTAR:
                    this.addClase(clase);break
                case constants.ACCION_ORIGEN.MOVER:
                    this.moveClase(clase);break
                default:
                    console.log("ERROR origen desconocido de la accion")
            }
        }
            return false;
    }

    /**
     * Terminar de arrastrar un objeto
     */
    handleDragEnd(e) {
        e.target.style.opacity = '1';
        let objectOver = document.querySelectorAll("div[class^='objectOver']");
        if (objectOver) {
            for(var i = 0; i < objectOver.length; i++) {
                console.log("handleDragEnd")
                objectOver[i].classList.remove('objectOver');
            }
        }
    }


    /**
     * Si se arrastra un objeto sobre un link, evita
     * que el navegador redirija a ese link
     */
    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false
    }

    /**
     * Un objeto distitno esta siendo arrastrado encima de este
     */
    handleDragEnter(e) {
        //console.log("onDragEnter!!")
        // Insertamos css para que este objeto tenga un borde de puntitos
        // indicando que el otro objeto se puede soltar sobre este.
        //e.target.classList.remove('celdaSinClase');
        e.target.classList.add('objectOver');
    }

    /**
     * Un objeto distitno ha dejado de ser arrastrado por encima de este
     */
    handleDragLeave(e) {
        //console.log("onDragLeave!!")
        // Eliminamos el css con el borde de puntitos indicando que el otro
        // objeto ya no se puede soltar sobre este.
        e.target.classList.remove('objectOver');
        //e.target.classList.add('celdaSinClase');
    }

    htmlAlertInfo() {
        return (
            <div className="alertInfo">
                <Alert severity="info">Información:
                    <ul>
                        <li> Puedes añadir clases al horario arrastrándolas.</li>
                        <li> Dentro del horario puedes mover clases arrastrándolas.</li>
                        <li> Dentro del horario puedes cambiar la duración de las clases clicando sobre ellas.</li>
                        <li> Dentro del horario puedes eliminar clases clicando sobre el icono: <DeleteSharpIcon></DeleteSharpIcon></li>
                    </ul>
                </Alert>
            </div>
        )
    }



    render() {
        return (
            <div>
                {this.htmlCabecera()}
                <h5 className="titulo" style={{marginLeft:"5%"}}>Grado en Ingeniería Informática > 1ºcurso > Otoño > Grupo Mañanas</h5>
                {this.htmlAlertInfo()}
                {this.htmlCard()}
                {this.htmlHorario()}
            </div>

        )

    }
}

export default Horario;
