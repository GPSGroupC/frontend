import React from "react";
import eina from '../../../images/eina-logo.png'
import calendar from '../../../images/calendar-logo.png'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import isWeekend from 'date-fns/isWeekend';
import axios from 'axios'





const baseUrl = "http://localhost:8000"
const herokuUrl = "https://timetableeina-back.herokuapp.com/"


class Formulario extends React.Component {

    constructor(props) {
        super(props)
        this.state = {         
            ultModificacion: null,
            inicioPrimer_cuatri:null,
            inicioSegundo_cuatri:null,
            inicioSegundaConvocatoria:null,
            estadoCurso: "2021-2022"
        }
    }

    getAllCalendarData = async (curso) => {
        axios({ method: 'GET', url: herokuUrl + "/calendar/getCalendar", 
        params: { 
            course: curso,      
        }})
        .then( (response) => {
            if(response.status !== 225){
              
                let dateIC1 = this.parseDate(response.data[0].fechainicio1.split('-'))
                let dateIC2 = this.parseDate(response.data[0].fechainicio2.split('-'))
                let dateIS1 = this.parseDate(response.data[0].fechainiciosept.split('-'))
                this.handleChangePrimerCuatri(dateIC1)
                this.handleChangeSegundoCuatri(dateIC2)
                this.handleChangeSegundaConv(dateIS1)
                this.handleChangeUltModificacion(this.parseDate(response.data[0].fechaultmodificacion.split('-')))
            }else{
                this.handleChangePrimerCuatri(null)
                this.handleChangeSegundoCuatri(null)
                this.handleChangeSegundaConv(null)
                this.handleChangeUltModificacion(null)
            }
        })
        .catch(error => {
                console.log(error);
        })
    }
    /**
     * 
     * @param {String} date : Recibe un array con una fecha en formato DD-MM-YYYY
     * , donde date[2] = AÑO , date[1] = MES, date[0] = dia
     * @returns Devuelve una Date en formato YYYY-MM-DD
     */
    parseDate = (date) => {
        //El mes se numera desde el 0, por eso (Mes=date[1]) - 1
        return new Date(date[2], date[1] - 1,date[0])
    }

    componentDidMount = () => {
        this.getAllCalendarData('2021-2022')
    }
    
    
    handleChangeUltModificacion = (newValue) => {
        this.setState({ ultModificacion: newValue})
    };
    
    handleChangePrimerCuatri = (newValue) => {
        this.setState({ inicioPrimer_cuatri: newValue})};

    handleChangeSegundoCuatri = (newValue) => {
        this.setState({ inicioSegundo_cuatri: newValue})
    };
    
    handleChangeSegundaConv = (newValue) => {
        this.setState({ inicioSegundaConvocatoria: newValue})
    };

    HandleChangeCurso = (cursoSeleccionado) => {
        this.setState({estadoCurso: cursoSeleccionado.target.value}, () =>{
           this.getAllCalendarData(cursoSeleccionado.target.value)
        })
    
    }

    handleGuardarCambios =  () => {

        axios({ method: 'POST', url: herokuUrl + "/calendar/updateCalendar", 
        data: { 
            fecha_inicio_1: this.state.inicioPrimer_cuatri, 
            fecha_inicio_2: this.state.inicioSegundo_cuatri, 
            convSeptiembre: this.state.inicioSegundaConvocatoria,
            course: this.state.estadoCurso, 
        }})
            .then( () => {
                console.log("Exito en el envio");
            })
            .catch(error => {
                console.log(error);
            })
    }


    render () {
        return ( 
            <div className="filtro">

                <div>
                    <Link to="/"><img className="logoCab2" src={eina} /></Link>
                    <Link to="/">
                        <button type="button" className="btn btn-info btn-lg" style={{"margin-left": "750px", "margin-top":"15px"}}>SALIR SIN GUARDAR</button>
                    </Link>
                    <hr size="5px" color="black" />
                </div>
                <br></br><br></br>
        
                <div className="filtro2">
                <h4 className="titulo">CALENDARIO GRADOS</h4>
                <div className="form-group" style={{"width":"35%"}}>
                    <label for="exampleSelect1" className="form-label mt-4">Curso</label>
                    <select value={this.state.estadoCurso} onChange={this.HandleChangeCurso} className="form-select" id="exampleSelect1">
                        <option value="2021-2022">2021-2022</option>
                        <option value="2022-2023">2022-2023</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2026-2027">2026-2027</option>
                    </select>
                </div>
                <br></br>
                </div>


                <div className="filtro2">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <h10 className="texto1">Fecha de ultima modificación</h10>
                    <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                        <DesktopDatePicker
                            label="dd/mm/yyyy"
                            inputFormat="dd/MM/yyyy"
                            value={this.state.ultModificacion}
                            readOnly={true}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>

                    <br></br>

                    <h10 className="texto1">Inicio primer semestre</h10>
                    <div style={{"margin-top":"10px"}}>
                        <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                        <DesktopDatePicker
                            label="dd/mm/yyyy"
                            inputFormat="dd/MM/yyyy"
                            value={this.state.inicioPrimer_cuatri}
                            onChange={this.handleChangePrimerCuatri}
                            defaultCalendarMonth={ new Date(this.state.estadoCurso.split('-')[0],8)}
                            minDate={new Date("9-1-" + this.state.estadoCurso.split('-')[0])}
                            maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[0])}
                            shouldDisableDate={isWeekend}
                            renderInput={(params) => <TextField {...params} />}
                        />  
                        </Stack>                
                    </div>

                    <br></br>
                    <h10 className="texto1">Inicio segundo semestre</h10>
                    <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                        <DesktopDatePicker
                            label="dd/mm/yyyy"
                            inputFormat="dd/MM/yyyy"
                            value={this.state.inicioSegundo_cuatri}
                            defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1],1)}
                            minDate={new Date("2-1-" + this.state.estadoCurso.split('-')[1])}
                            maxDate={new Date("2-29-" + this.state.estadoCurso.split('-')[1])}
                            onChange={this.handleChangeSegundoCuatri}
                            renderInput={(params) => <TextField {...params} />}
                        />  
                    </Stack> 

                    <br></br>
                    <h10 className="texto1">Inicio período exámenes 2ª convocatoria</h10>
                    <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                        <DesktopDatePicker
                            label="dd/mm/yyyy"
                            inputFormat="dd/MM/yyyy"
                            value={this.state.inicioSegundaConvocatoria}
                            onChange={this.handleChangeSegundaConv}
                            defaultCalendarMonth={new Date(this.state.estadoCurso.split('-')[1],8)}
                            minDate={new Date("9-1-" + this.state.estadoCurso.split('-')[1])}
                            maxDate={new Date("9-30-" + this.state.estadoCurso.split('-')[1])}
                            renderInput={(params) => <TextField {...params} />}
                        />  
                    </Stack>
                </LocalizationProvider>
                </div>

                

                
                <h3 style={{"margin-bottom":"30px","margin-top":"70px", "margin-left":"30%" }}>ESPACIO PARA LOS CALENDARIOS</h3>

                




                <Link to="/">
                    <button onClick={this.handleGuardarCambios} type="button" className="btn btn-info btn-lg" style={{"margin-left": "45%"}}>GUARDAR</button>
                </Link>
                
                
            
            </div>
    );
    }
}

export default Formulario;

