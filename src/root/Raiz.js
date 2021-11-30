import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import CalendarioGrado from '../calendario/CalendarioGrado'
import HorarioGrado from '../horario/HorarioGrado'
import HorarioMaster from '../horario/HorarioMaster'
import Pdf from "../calendario/utils/Pdf";

function Raiz(){

    return (

        <BrowserRouter>
            <Route exact path="/" component={App} />
            <Route exact path="/inicio" component={App} />
            <Route exact path="/home" component={App} />
            <Route exact path="/calendario-grado" component={CalendarioGrado}/>
            <Route exact path="/horario-grado" component={HorarioGrado}/>
            <Route exact path="/horario-master" component={HorarioMaster}/>
            <Route exact path="/calendario-pdf" component={Pdf}/>

        </BrowserRouter>

    )

}

export default Raiz
