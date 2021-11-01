import React, {Component} from 'react';
import Formulario from './componentes/Formulario';
import Calendario from './componentes/Calendario';

class CalendarioGrado extends Component {
    render() {
        return (
            <div>
                <Formulario></Formulario>
                <Calendario></Calendario>
            </div>
        );
    }
}

export default CalendarioGrado;