import React, {Component} from "react";
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import eina from "../images/eina-logo.png";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import constants from "./utils/Constants";
import Api from "./servicios/api";
import './Horario.css'

/**
 * Interfaz para editar un horario de una carrera, curso, cuatrimestre y grupo
 */
class Horario extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            //Lista de clases [{dia, hora, asignatura, duracion, tipo}], insertadas al horario
            horario: [],
            //Lista de asignaturas asociadas a una carrera, curso y cuatrimestre
            asignaturas: [],
            //Errores
            error: null,
            errorMessage: "",
            //Drag and Drop
            //Asignatura de la clase seleccionada al arrastrar
            asignaturaSelected: null,
            //Tipo de la clase seleccionada al arrastrar
            tipoSelected: null,
            //Origen de la accion de arrastrar una asignatura
            // (INSERTAR desde fuera del horario o MOVER desde dentro)
            origen_accion: constants.ACCION_ORIGEN.INSERTAR,
            diaOrigenAlMover: null, //Dia de la clase que se mueve
            horaOrigenAlMover: null, //Hora de la clase que se mueve
            //Los campos del horario que nos pasan desde SeleccionHorarioGrados.js (id,codplan,curso,periodo...)
            camposHorario: "",
            nombre: ""
        }
    }

    /**
     * Actualiza las asignaturas asociadas al horario de una carrera, curso y cuatrimestre concreto
     * solo si ha recibido una respuesta correcta del backend
     */
    async updateAsignaturas () {
        await Api.obtenerAsignaturasHorario(this.state.camposHorario.codplan,this.state.camposHorario.curso,this.state.camposHorario.periodo).then(response => {
            if (response.data) {
                let asignaturas = []
                response.data.map((asignatura) => {
                    asignaturas.push(
                        {codasig: asignatura.codasig, nomasig: asignatura.nombre}
                    )
                })
                this.setState({
                    asignaturas: asignaturas
                })
            }
        }).catch(err => {
            console.log("Error al obtener asignaturas para un horario", err)
        })
    }

    async guardarListadoClases(idhorario, listadoClases) {
        await Api.guardarListadoClases(idhorario, listadoClases).then(r => {
            console.log(r);
            if (r.status === 200) {
                window.alert("Horario guardado con ??xito");
            } else {
                window.alert("Ha ocurrido un error al guardar el horario");
            }
        }).catch(err => {
            console.log("Error al guardar las clases de un horario", err)
        })
    }

    async obtenerListadoClases(idhorario) {
        await Api.obtenerListadoClases(idhorario).then(response => {
            if (response.data) {
                console.log(response.data)
                response.data.map((clase) => {
                    this.addClase(clase)
                })
            }
        }).catch(err => {
            console.log("Error al obtener las clases de un horario", err)
        })
    }

    componentDidMount() {
        if (this.props.location.horario === undefined || this.props.location.nombre === undefined) {
            this.state.camposHorario = JSON.parse(localStorage.getItem('horario'));
            this.state.nombre = JSON.parse(localStorage.getItem('nombre'));
        } else {
            localStorage.setItem('horario', JSON.stringify(this.props.location.horario))
            localStorage.setItem('nombre', JSON.stringify(this.props.location.nombre))
            this.state.camposHorario = this.props.location.horario;
            this.state.nombre = this.props.location.nombre;
        }
        this.updateAsignaturas()
        this.obtenerListadoClases(this.state.camposHorario.id)
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
     * @param newClase Objeto clase {dia, hora, asignatura, duracion, tipo}
     * Intenta insertar la clase 'newClase' al horario
     */
    addClase(newClase) {
        if(!this.canAddClase(newClase)) {
            //No podemos insertar la clase al horario
            this.setState({
                error: true,
                errorMessage: constants.MENSAJE_ERROR.SOLAPAMIENTO
            })
        } else {
            //Podemos insertar la clase al horario
            console.log(this.state.camposHorario)
            this.setState({
                error: false,
                horario: [...this.state.horario, newClase],
            })
        }
    }

    /**
     * @param oldClase Objeto clase que se quiere mover
     * @param newClase Igual que oldClase pero con 'dia' y 'hora'
     * actualizados al lugar donde se quiere mover la clase
     */
    moveClase = (oldClase, newClase) => {
        if (oldClase && newClase && !this.haySolapamiento(newClase)) {
            //Podemos mover oldClase a newClase
            this.setState({
                error: false,
                horario: [...this.delClaseFromHorario(oldClase), newClase],
            })
        } else {
            //No podemos mover oldClase a newClase
            this.setState({
                error: true,
                errorMessage: constants.MENSAJE_ERROR.SOLAPAMIENTO
            })
        }
    }

    /**
     *
     * @param hora String "8:30"
     * @param dia String "Lunes"
     * Devuelve el objeto clase asociado a un dia y hora del horario.
     * Si no existe, devuelve undefined
     */
    getClaseFromHorario(dia, hora) {
        if (dia && hora) {
            return this.state.horario.find(clase =>
                clase.dia == dia && clase.hora == hora
            )
        }
    }

    /**
     *
     * @param clase Objeto clase
     * Elimina una clase del horario
     */
    delClaseFromHorario(clase) {
        let horario = this.state.horario.filter((c) => c !== clase)
        return horario
    }

    /**
     * @param e
     * @param clase Objeto clase dia, hora, asignatura, duracion, tipo}
     * Evento eliminar clase de horario
     */
    handleDelClase = (e, clase) => {
        e.stopPropagation(); // Hace que el html padre no expanda su comportamiento onClick en este boton
        this.setState({
            horario:  this.delClaseFromHorario(clase),
        })
    }

    /**
     *
     * @param clase Objeto clase
     * @param duracion Duracion de 'clase'
     * @param posicion [Inicio | Medio | Fin ] Posicion del fragmento a cada clase segun su tamanho
     * Devuelve el CSS asociado a cada clase segun su tipo y posicion en el horario
     */
    getCSS(clase, duracion, posicion) {
        let color
        let className
        switch (clase.tipo) {
            case constants.TIPO_CLASE.TEORIA.NOMBRELARGO:
                //Si es clase de teoria, azul
                color =  "#d7dfe8"; break
            case constants.TIPO_CLASE.PROBLEMAS.NOMBRELARGO:
                color =  "#FCF7C3"; break //amarillo
            case constants.TIPO_CLASE.PRACTICAS_A.NOMBRELARGO:
                color =  "#B4D4FF"; break //azul
            case constants.TIPO_CLASE.PRACTICAS_B.NOMBRELARGO:
                color =  "#FF6262"; break //rojo
            default:
                //Resto de casos, blanco
                color = "#FFFFFF"; break
        }
        if (duracion === constants.DURACION_CLASE.MEDIA_HORA) {
            //La clase dura media hora
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
        this.state.horario.map((clase) => console.log("HORARIO:" + clase.nomasig + " " + clase.duracion))
    }

    /**************************
     * Drag and Drop handlers
     **************************/

    /**
     * Arrastrar una clase desde fuera del horario para INSERTARLA
     */
    handleDragStartInsertar = (e, asignatura, tipo) =>{
        e.target.style.opacity = '0.4';

        this.state.asignaturaSelected = asignatura
        this.state.tipoSelected = tipo
        this.state.origen_accion = constants.ACCION_ORIGEN.INSERTAR
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target.textContent)
    }
    /**
     * Arrastrar una clase desde dentro del horario para MOVERLA
     */
    handleDragStartMover = (e, dia, hora, asignatura, tipo) => {
        e.target.style.opacity = '0.4';
        this.state.origen_accion = constants.ACCION_ORIGEN.MOVER
        this.state.diaOrigenAlMover = dia
        this.state.horaOrigenAlMover = hora
        this.state.asignaturaSelected = asignatura
        this.state.tipoSelected = tipo
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target.textContent)
    }

    /**
     *
     * @param e
     * @param dia
     * @param hora
     * Evento: el usuario ha soltado una clase sobre la celda 'e.target'
     */
    handleDrop = (e, dia, hora) => {
        e.stopPropagation(); // Evita redireccion del navegador.
        if(this.state.asignaturaSelected && this.state.tipoSelected) {
            console.log("OLEE!!")
            let newClase = {
                dia: dia,
                hora: hora,
                nomasig: this.state.asignaturaSelected,
                duracion: 30,
                tipo: this.state.tipoSelected
            }
            console.log(newClase)
            switch(this.state.origen_accion) {
                case constants.ACCION_ORIGEN.INSERTAR:
                    this.addClase(newClase);break
                case constants.ACCION_ORIGEN.MOVER:
                    let oldClase = this.getClaseFromHorario(this.state.diaOrigenAlMover, this.state.horaOrigenAlMover)
                    this.moveClase(oldClase, newClase);break
                default:
                    console.log("ERROR origen desconocido de la accion")
            }
        }
        return false;
    }

    /**
     * Evento: el usuario ha soltado la clase 'e.target' sobre una celda
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
     * Evento: el usuario arrastra la clase encima de la celda 'e.target'
     */
    handleDragEnter(e) {
        //Mostrar borde punteado para que el usuario entienda que es dropeable
        e.target.classList.add('objectOver');
    }

    /**
     * Evento: el usuario ha dejado de arrastrar una clase encima de la celda 'e.target'
     */
    handleDragLeave(e) {
        //Esconder borde punteado
        e.target.classList.remove('objectOver');
    }

    /**********************
     * Html subcomponentes
     *********************/

    /**
     * html de la cabecera con el logo y titulo
     */
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
            <div style={{marginTop: "20px"}}>
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
                <Alert severity="success">Clase a??adida correctamente</Alert>
            </div>
        )
    }

    /**
     *  html con la tarjeta contenedora de la asignaturas arrastables
     */
     htmlCard() {
        return(
            <div className="fondoCard">
                <p>Arrastra una clase al horario</p>
                <div className="contenidoCard">
                    <p style={{fontWeight: "bold"}}>Clases Te??ricas:</p>
                    <div className="asignaturas">
                        {
                            this.state.asignaturas.map((asignatura) => {
                                return (
                                    <div className="asignatura"
                                         draggable="true"
                                         onDragStart={(e) => this.handleDragStartInsertar(e, asignatura.nomasig, constants.TIPO_CLASE.TEORIA.NOMBRELARGO)}
                                         onDragEnd={this.handleDragEnd}>
                                        <DragIndicatorIcon></DragIndicatorIcon>
                                        {asignatura.nomasig}</div>
                                )
                            })
                        }
                    </div>
                    <br></br>

                    <p style={{fontWeight: "bold"}}>Clases Pr??cticas Semana A:</p>
                    <div className="asignaturas_practicas_A">
                        {
                            this.state.asignaturas.map((asignatura) => {
                                return (
                                    <div className="asignatura_practicas_A"
                                         draggable="true"
                                         onDragStart={(e) => this.handleDragStartInsertar(e, asignatura.nomasig, constants.TIPO_CLASE.PRACTICAS_A.NOMBRELARGO)}
                                         onDragEnd={this.handleDragEnd}>
                                        <DragIndicatorIcon></DragIndicatorIcon>
                                        {asignatura.nomasig}</div>
                                )
                            })
                        }
                    </div>
                    <br></br>

                    <p style={{fontWeight: "bold"}}>Clases Pr??cticas Semana B:</p>
                    <div className="asignaturas_practicas_B">
                        {
                            this.state.asignaturas.map((asignatura) => {
                                return (
                                    <div className="asignatura_practicas_B"
                                         draggable="true"
                                         onDragStart={(e) => this.handleDragStartInsertar(e, asignatura.nomasig, constants.TIPO_CLASE.PRACTICAS_B.NOMBRELARGO)}
                                         onDragEnd={this.handleDragEnd}>
                                        <DragIndicatorIcon></DragIndicatorIcon>
                                        {asignatura.nomasig}</div>
                                )
                            })
                        }
                    </div>
                    <br></br>

                    <p style={{fontWeight: "bold"}}>Clases Problemas:</p>
                    <div className="asignaturas_problemas">
                        {
                            this.state.asignaturas.map((asignatura) => {
                                return (
                                    <div className="asignatura_problemas"
                                         draggable="true"
                                         onDragStart={(e) => this.handleDragStartInsertar(e, asignatura.nomasig, constants.TIPO_CLASE.PROBLEMAS.NOMBRELARGO)}
                                         onDragEnd={this.handleDragEnd}>
                                        <DragIndicatorIcon></DragIndicatorIcon>
                                        {asignatura.nomasig}</div>
                                )
                            })
                        }
                    </div>

                    {(this.state.error)
                        ? this.htmlAlertError(this.state.errorMessage)
                        : <div style={{minHeight:"45px"}}></div>
                    }
                </div>
            </div>
        )
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
            nombreAsignatura = clase.nomasig
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
                    //console.log("Clase SEGUNDO ABAJO!: " + clase.nomasig)
                    css = this.getCSS(claseAnteriorHora, claseAnteriorHora.duracion, constants.POSICION.FIN)
                }
            }
        }
        return (
            <td className={css.className}
                id={dia + " " + hora}
                style={{backgroundColor: css.color, cursor:(nombreAsignatura) ? "move" : "default"}}
                draggable={(nombreAsignatura) ? "true" : "false"}
                onDragStart={(e) => this.handleDragStartMover(e, dia, hora, nombreAsignatura, clase.tipo)}
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

    /**
     *
     * Html asociado a la tabla del horario
     */
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
     * Html para informar al usuario sobre la funcionalidad de esta interfaz
     */
    htmlAlertInfo() {
        return (
            <div className="alertInfo">
                <Alert severity="info">Informaci??n:
                    <ul>
                        <li> Puedes <b>a??adir clases</b> al horario arrastr??ndolas.</li>
                        <li> Dentro del horario puedes <b>mover clases</b> arrastr??ndolas.</li>
                        <li> Dentro del horario puedes <b>cambiar la duraci??n</b> de las clases clicando sobre ellas.</li>
                        <li> Dentro del horario puedes <b>eliminar clases</b> clicando sobre el icono: <DeleteSharpIcon></DeleteSharpIcon></li>
                    </ul>
                </Alert>
            </div>
        )
    }

    htmlGuardarButton() {
        return (
            //<Link to="/">
                    <button onClick={() => {
                        console.log("Guardar listado clases")
                        console.log(this.state.horario)
                        this.guardarListadoClases(this.state.camposHorario.id, this.state.horario)
                    }} type="button" className="btn btn-info btn-lg" style={{marginLeft:"5%",marginTop:"1%"}}>GUARDAR
                    </button>
                //</Link>
        )
    }



    render() {
        const { nombre } = this.props.location
        const { horario } = this.props.location
        return (
            <div>
                {this.htmlCabecera()}
                <h5 className="titulo" style={{marginLeft:"5%"}}>{this.state.nombre} {">"} {this.state.camposHorario.curso}??curso {">"} {this.state.camposHorario.periodo} {">"} Grupo {this.state.camposHorario.grupo} {this.state.camposHorario.descripcion}</h5>
                {this.htmlAlertInfo()}
                {this.htmlCard()}
                {this.htmlHorario()}
                {this.htmlGuardarButton()}
            </div>

        )

    }
}

export default Horario;

