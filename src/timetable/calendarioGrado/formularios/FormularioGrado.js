import React, { Fragment, useState } from "react";
import eina from '../../../images/eina-logo.png'
import calendar from '../../../images/calendar-logo.png'
import { Link } from 'react-router-dom'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';








function FormularioGrado() {
    
    const [value, setValue] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    const [value3, setValue3] = React.useState(null);
    const [value4, setValue4] = React.useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    
    const handleChange2 = (newValue) => {
        setValue2(newValue);
    };

    const handleChange3 = (newValue) => {
        setValue3(newValue);
    };
    
    const handleChange4 = (newValue) => {
        setValue4(newValue);
    };

    return (

    
        <div className="filtro">

            <div>
                <Link to="/"><img className="logoCab2" src={eina} /></Link>
                <Link to="/">
                    <button type="button" class="btn btn-info btn-lg" style={{"margin-left": "350px", "margin-top":"15px"}}>SALIR SIN GUARDAR</button>
                </Link>
                <hr size="5px" color="black" />
            </div>
            <br></br><br></br>
    
            <div className="filtro2">
            <h4 className="titulo">CALENDARIO GRADOS</h4>
            <div class="form-group" style={{"width":"35%"}}>
                <label for="exampleSelect1" class="form-label mt-4">Curso</label>
                <select class="form-select" id="exampleSelect1">
                    <option>2021-2022</option>
                    <option>2022-2023</option>
                    <option>2023-2024</option>
                    <option>2024-2025</option>
                    <option>2026-2027</option>
                </select>
            </div>
            <br></br>
            </div>


            <div className="filtro2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <h10 className="texto1">Fecha de aprobación de calendario en junta</h10>
                <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                    <DesktopDatePicker
                        label="dd/mm/yyyy"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChange}
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
                        value={value2}
                        onChange={handleChange2}
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
                        value={value3}
                        onChange={handleChange3}
                        renderInput={(params) => <TextField {...params} />}
                    />  
                </Stack> 

                <br></br>
                <h10 className="texto1">Inicio período exámenes 2ª convocatoria</h10>
                <Stack spacing={3} style={{"margin-top":"5px", "width":"35%"}}>
                    <DesktopDatePicker
                        label="dd/mm/yyyy"
                        inputFormat="dd/MM/yyyy"
                        value={value4}
                        onChange={handleChange4}
                        renderInput={(params) => <TextField {...params} />}
                    />  
                </Stack>
            </LocalizationProvider>
            </div>

            

            
            <h3 style={{"margin-bottom":"30px","margin-top":"70px", "margin-left":"30%" }}>ESPACIO PARA LOS CALENDARIOS</h3>

            




            <Link to="/">
                <button type="button" class="btn btn-info btn-lg" style={{"margin-left": "45%"}}>GUARDAR</button>
            </Link>
            
            
        
        </div>
    );
}

export default FormularioGrado;

