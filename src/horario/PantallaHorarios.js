import React, {Component} from "react";
import {Link} from 'react-router-dom'
import eina from '../images/eina-logo.png'
import './PantallaHorarios.css';
import ImportarAsignaturas from "./ImportarAsignaturas";
import ListarAsignaturas from "./ListarAsignaturas";
import SeleccionHorarioGrados from "./SeleccionHorarioGrados";
import ListarAulas from "./ListarAulas";
import ImportarAulas from "./ImportarAulas";

/**
 * Menu de pantallas de horarios.
 *
 * Este componente permite fijar el menu de horarios al navegar
 * entre las distintas pantallas de la parte de horarios.
 */
class PantallaHorarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {id: 1, name: "IMPORTAR ASIGNATURAS", component: <ImportarAsignaturas/>},
                {id: 2, name: "LISTAR ASIGNATURAS", component: <ListarAsignaturas/>},
                {id: 3, name: "IMPORTAR AULAS", component: <ImportarAulas/>},
                {id: 4, name: "LISTAR AULAS", component: <ListarAulas/>},
                {id: 5, name: "LISTAR HORARIOS", component: <SeleccionHorarioGrados/>}
            ],
            menuItemSelected: <ImportarAsignaturas/>
        }
    }

    handleClick = (event) => {
        var menuItem= this.state.menu.find((menuItem) => menuItem.id == event.target.value)
        this.setState({
            menuItemSelected: menuItem.component
        })
    }

    renderHeader() {
        return (<div>
                <div className="header">
                    <Link to="/"><img className="einaImg" src={eina}/></Link>
                    <h4 className="titulo">HORARIOS</h4>
                    <Link to="/">
                        <button type="button" className="btn btn-info btn-lg">INICIO</button>
                    </Link>
                </div><br/>
                <hr size="5px" color="black"/>
            </div>
        )
    }

    renderMenu() {
        return (
            <div className="menuHorarios">
                {this.state.menu.map((menuItem) => (
                <button id="buttonselect" type="button" value={menuItem.id}
                        onClick={this.handleClick}>{menuItem.name}</button>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className="bodyMargin">
                {this.renderHeader()}<br/><br/>
                {this.renderMenu()}<br/><br/>
                {this.state.menuItemSelected}
            </div>
        );
    };
}

export default PantallaHorarios;
