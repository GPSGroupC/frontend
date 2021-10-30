import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../../App'
import CalendarioMaster from './formularios/FormularioMaster'

function CalendarioMaster(){

    return (

        <BrowserRouter>

            <Route exact path="/aplicacion" component={App} />
            <Route exact path="/calendario-master" component={CalendarioMaster}/>
        
        
        </BrowserRouter>

    )

}

export default calendarioGrado

