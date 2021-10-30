import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../../App'
import CalendarioGrado from './formularios/FormularioGrado'

function calendarioGrado(){

    return (

        <BrowserRouter>

            <Route exact path="/aplicacion" component={App} />
            <Route exact path="/calendario-grado" component={CalendarioGrado}/>
        
        
        </BrowserRouter>

    )

}

export default calendarioGrado

