import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import CalendarioGrado from '../timetable/calendarioGrado/formularios/FormularioGrado'
import CalendarioMaster from '../timetable/calendarioMaster/formularios/FormularioMaster'

function Raiz(){

    return (

        <BrowserRouter>
            <Route exact path="/" component={App} />
            <Route exact path="/inicio" component={App} />
            <Route exact path="/home" component={App} />
            <Route exact path="/calendario-grado" component={CalendarioGrado}/>
            <Route exact path="/calendario-master" component={CalendarioMaster}/>
        </BrowserRouter>

    )

}

export default Raiz
