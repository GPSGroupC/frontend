import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import Calendario from '../calendario/Calendario'
import SeleccionHorarioGrados from '../horario/SeleccionHorarioGrados'
import Horario from "../horario/Horario";
import SeleccionHorarioMasters from "../horario/SeleccionHorarioMasters";
import ListarAsignaturas from "../horario/ListarAsignaturas";
import PantallaHorarios from "../horario/PantallaHorarios";
import ImportarAsignaturas from "../horario/ImportarAsignaturas";
import EditarCursos from "../horario/PantallaCursos";

function Raiz(){

    return (

        <BrowserRouter>
            <Route exact path="/" component={App} />
            <Route exact path="/inicio" component={App} />
            <Route exact path="/home" component={App} />
            <Route exact path="/calendario-grado" component={Calendario}/>
            <Route exact path="/seleccion-horario-grados" component={SeleccionHorarioGrados}/>
            <Route exact path="/seleccion-horario-masters" component={SeleccionHorarioMasters}/>
            <Route exact path="/editar-horario" component={Horario}/>
            <Route exact path="/listar-asignaturas" component={ListarAsignaturas}/>
            <Route exact path="/pantalla-horarios" component={PantallaHorarios}/>
            <Route exact path="/importar-asignaturas" component={ImportarAsignaturas}/>
            <Route exact path="/editar-cursos" component={EditarCursos}/>
        </BrowserRouter>

    )

}

export default Raiz
