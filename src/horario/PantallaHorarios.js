import React, {Component} from "react";
import { Link } from 'react-router-dom'
import eina from '../images/eina-logo.png'
import '../PantallaHorarios.css';
import ButtonGroup from 'react-bootstrap/Button';

/**
 * Interfaz Home para la parte de los horarios.
 */
class PantallaHorarios extends Component {

  constructor(props) {
    super(props);
    this.state = {
        listButtons: [
            { id:1, name: "IMPORTAR ASIGNATURAS", render: <p>IMPORTAR</p>},
            { id:2, name: "LISTAR ASIGNATURAS", render: <p>LISTAR AS</p>},
            { id:3, name: "LISTAR HORARIOS", render: <p>LISTAR HO</p>}
        ],
        selectedButton: 1
    }
  }

  handleClick = (event) => {
      this.setState({
          selectedButton: event
      })
  }
  render() {
    return (
        <div className="bodyMargin">
          <div className="header">
            <Link to="/"><img className="einaImg" src={eina} /></Link>
            <h4 className="titulo">HORARIOS</h4>
            <Link to="/">
              <button type="button" className="btn btn-info btn-lg">INICIO</button>
            </Link>
          </div>
          <br/>
          <hr size="5px" color="black"/>
          <br/><br/>


          <ButtonGroup vertical id="buttongroup">
            <Link to="/importar-asignaturas">
              <button id="buttonselect" type="button">IMPORTAR ASIGNATURAS</button>
            </Link>
            <Link to="/listar-asignaturas">
              <button id="buttonselect" type="button">LISTAR ASIGNATURAS</button>
            </Link>
            <Link to="/seleccion-horario-grados">
              <button id="buttonselect" type="button">EDITAR HORARIOS</button>
            </Link>
              {
                  this.state.listButtons.map((button) => (
                      <button id="buttonselect" type="button" value={button.id}
                              onClick={this.handleClick}>{button.name}</button>
                  ))
              }
          </ButtonGroup>
        </div>
    );
  };
}
export default PantallaHorarios;
