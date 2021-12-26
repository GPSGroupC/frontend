import * as React from 'react';
import eina from '../images/eina-logo.png'
import { Link } from 'react-router-dom'

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 500,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));





function SeleccionHorarioMasters() {


    //Master Ingenieria Informatica
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Master arquitectura
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    //Master ing electronica
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const open3 = Boolean(anchorEl3);
    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorEl3(null);
    };
    

    //Master ing quimica
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const open4 = Boolean(anchorEl4);
    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    const handleClose4 = () => {
        setAnchorEl4(null);
    };

    //Master ing industrial
    const [anchorEl5, setAnchorEl5] = React.useState(null);
    const open5 = Boolean(anchorEl5);
    const handleClick5 = (event) => {
        setAnchorEl5(event.currentTarget);
    };
    const handleClose5 = () => {
        setAnchorEl5(null);
    };

    //Master ing teleco
    const [anchorEl6, setAnchorEl6] = React.useState(null);
    const open6 = Boolean(anchorEl6);
    const handleClick6 = (event) => {
        setAnchorEl6(event.currentTarget);
    };
    const handleClose6 = () => {
        setAnchorEl6(null);
    };

    //Master energias
     const [anchorEl7, setAnchorEl7] = React.useState(null);
     const open7 = Boolean(anchorEl7);
     const handleClick7 = (event) => {
         setAnchorEl7(event.currentTarget);
     };
     const handleClose7 = () => {
         setAnchorEl7(null);
     };

     //Master ing mec
     const [anchorEl8, setAnchorEl8] = React.useState(null);
     const open8 = Boolean(anchorEl8);
     const handleClick8 = (event) => {
         setAnchorEl8(event.currentTarget);
     };
     const handleClose8 = () => {
         setAnchorEl8(null);
     };

     //Master ing biomed
     const [anchorEl9, setAnchorEl9] = React.useState(null);
     const open9 = Boolean(anchorEl9);
     const handleClick9 = (event) => {
         setAnchorEl9(event.currentTarget);
     };
     const handleClose9 = () => {
         setAnchorEl9(null);
     };

     //Master ing diseño
     const [anchorEl10, setAnchorEl10] = React.useState(null);
     const open10 = Boolean(anchorEl10);
     const handleClick10 = (event) => {
         setAnchorEl10(event.currentTarget);
     };
     const handleClose10 = () => {
         setAnchorEl10(null);
     };

     //Master robotics
     const [anchorEl11, setAnchorEl11] = React.useState(null);
     const open11 = Boolean(anchorEl11);
     const handleClick11 = (event) => {
         setAnchorEl11(event.currentTarget);
     };
     const handleClose11 = () => {
         setAnchorEl11(null);
     };
    
     //infmat
     const [anchorEl12, setAnchorEl12] = React.useState(null);
     const open12 = Boolean(anchorEl12);
     const handleClick12 = (event) => {
         setAnchorEl12(event.currentTarget);
     };
     const handleClose12 = () => {
         setAnchorEl12(null);
     };

    return (
  
        <div className="HorarioSeleccion">

        <div>
            <Link to="/"><img className="logoCabecera" src={eina} /></Link>
            <Link to="/">
                <button type="button" className="btn btn-info btn-lg" style={{"margin-left": "750px", "margin-top":"15px"}}>SALIR SIN GUARDAR</button>
            </Link>
            <hr size="5px" color="black" />
        </div> <br></br>

        <div style={{marginLeft: "5%"}}>
            <h4 className="titulo">EDITAR HORARIOS</h4>
        </div>  

        <div style={{"margin-left": "30%", marginRight:'30%'}} >  
            <Link to="/importar-asignaturas"><button type="button" class="btn btn-outline-info">IMPORTAR ASIGNATURAS</button></Link>
            <Link to="/listar-asignaturas"><button type="button" class="btn btn-outline-info">LISTAR ASIGNATURAS</button></Link>
            <Link to="/seleccion-horario-masters"><button type="button" class="btn btn-info btn-md">EDITAR HORARIOS</button></Link>
        </div> <br></br> 

        <div style={{"margin-left": "37.5%"}} > 
            <Link to="/seleccion-horario-grados"><button type="button" class="btn btn-outline-info" style={{"margin-left": "70px"}}>GRADO</button></Link>
            <button type="button" class="btn btn-info btn-md">MASTER</button> 
    
        </div> <br></br>


<div className="titulaciones">

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button" aria-controls="fade-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería Informática  </Button>
        <StyledMenu id="demo-customized-menu4"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl} open={open} onClose={handleClose}
        >
            <MenuItem onClick={handleClose} disableRipple> 471-s1 y 481-s3 Master Universitario en Ingeniería Informática. Otoño </MenuItem>
            <MenuItem onClick={handleClose} disableRipple> 471-S2 1º Máster Universitario en Ingeniería Informática. Primavera. </MenuItem>
        
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button2" aria-controls="fade-menu2" aria-haspopup="true" aria-expanded={open2 ? 'true' : undefined} onClick={handleClick2} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Arquitectura</Button>
        <StyledMenu id="demo-customized-menu2"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl2} open={open2} onClose={handleClose2}
        >
            <MenuItem onClick={handleClose2} disableRipple> 171-S1 Master Universitario en Arquitectura. Otoño </MenuItem>
        
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button3" aria-controls="fade-menu3" aria-haspopup="true" aria-expanded={open3 ? 'true' : undefined} onClick={handleClick3} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería Electrónica</Button>
        <StyledMenu id="demo-customized-menu3"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl3} open={open3} onClose={handleClose3}
        >
            <MenuItem onClick={handleClose3} disableRipple> 371-S1 Máster Universitario en Ingeniería Electrónica. Otoño </MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 371-S2 Máster Universitario en Ingeniería Electrónica. Primavera. </MenuItem>
        
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button4" aria-controls="fade-menu4" aria-haspopup="true" aria-expanded={open4 ? 'true' : undefined} onClick={handleClick4} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería Química</Button>
        <StyledMenu id="demo-customized-menu4"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl4} open={open4} onClose={handleClose4}
        >
            <MenuItem onClick={handleClose4} disableRipple> 771-S1 1º Máster Universitario en Ingeniería Química. Otoño. </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 771-S2 1º Máster Universitario en Ingeniería Química. Primavera. </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 781-S3 2º Máster Universitario en Ingeniería Química. Otoño. </MenuItem>

        
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button5" aria-controls="fade-menu5" aria-haspopup="true" aria-expanded={open5 ? 'true' : undefined} onClick={handleClick5} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería Industrial</Button>
        <StyledMenu id="demo-customized-menu5"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl5} open={open5} onClose={handleClose5}
        >
            <MenuItem onClick={handleClose5} disableRipple> Itinerarios Máster Ingeniería Industrial. </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 871-S1 1º Máster en Ingeniería Industrial. Otoño. Sin homogeneización acceso Grado Tecnologías Industriales EINA </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 871-S2 1º Máster en Ingeniería Industrial. Primavera </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 872-S1 1º Máster en Ingeniería Industrial. Otoño. Sin homogeneización acceso Grado Tecnologías Industriales EINA</MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 872/873-S2 1º Máster en Ingeniería Industrial. Primavera</MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 873-S1 1º Máster en Ingeniería Industrial. Otoño. Con homogeneización acceso Grado I. Mecánica EINA</MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 873-S1 1º Máster en Ingeniería Industrial. Otoño. Con homogeneización acceso Grados I. Eléctrica y Electrónica EINA</MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 873-S1 1º Máster en Ingeniería Industrial. Otoño. Con homogeneización acceso Grados I. Mecatrónica</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose5} disableRipple> 881-S3 2º Máster en Ingeniería Industrial. Otoño.Optativas</MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 881-S4 2º Máster en Ingeniería Industrial. Primavera. Optativas</MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 882-S3 2º Máster en Ingeniería Industrial. Otoño</MenuItem>
        
        </StyledMenu>
    </div>


    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button6" aria-controls="fade-menu6" aria-haspopup="true" aria-expanded={open6 ? 'true' : undefined} onClick={handleClick6} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería de Telecomunicación</Button>
        <StyledMenu id="demo-customized-menu6"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl6} open={open6} onClose={handleClose6}
        >
            <MenuItem onClick={handleClose6} disableRipple> 971-S1-1º Máster Universitario en Ingeniería de Telecomunicación. Otoño </MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 971-S2-1º Máster Universitario en Ingeniería de Telecomunicación. Primavera. </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose6} disableRipple> 981-S3-2º Máster Universitario en Ingeniería de Telecomunicación. Otoño </MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 981-S4-2º Máster Universitario en Ingeniería de Telecomunicación. Primavera. </MenuItem>

        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button7" aria-controls="fade-menu7" aria-haspopup="true" aria-expanded={open7 ? 'true' : undefined} onClick={handleClick7} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Energías Renovables y Eficiencia Energética</Button>
        <StyledMenu id="demo-customized-menu7"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl7} open={open7} onClose={handleClose7}
        >
            <MenuItem onClick={handleClose7} disableRipple> 271-S1 Máster Universitario en Energías Renovables y Eficiencia Energética. Del 18-10-2021 al 14-01-2022. </MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 271-S1 Máster Universitario en Energías Renovables y Eficiencia Energética. Del 22-09-2021 al 15-10-2021. </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose7} disableRipple> 271-S2 Máster Universitario en Energías Renovables y Eficiencia Energética. Itinerario Sistemas Eléctricos. Primavera </MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 271-S2 Máster Universitario en Energías Renovables y Eficiencia Energética. Itinerario Sistemas Térmicos. Primavera </MenuItem>

        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button8" aria-controls="fade-menu8" aria-haspopup="true" aria-expanded={open8 ? 'true' : undefined} onClick={handleClick8} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería Mecánica</Button>
        <StyledMenu id="demo-customized-menu8"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl8} open={open8} onClose={handleClose8}
        >
            <MenuItem onClick={handleClose8} disableRipple> 571-S1 Máster Universitario en Ingeniería Mecánica. Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 571-S2 Máster Universitario en Ingeniería Mecánica. Primavera </MenuItem>
        
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button9" aria-controls="fade-menu9" aria-haspopup="true" aria-expanded={open9 ? 'true' : undefined} onClick={handleClick9} endIcon={<KeyboardArrowDownIcon />}>
            Máster Universitario en Ingeniería Biomédica</Button>
        <StyledMenu id="demo-customized-menu9"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl9} open={open9} onClose={handleClose9}
        >
            <MenuItem onClick={handleClose9} disableRipple> 671-S1 Master Universitario en Ingeniería Biomédica. Otoño </MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 671-S2 Master Universitario en Ingeniería Biomédica. Primavera. Bimestre 1 (del 31 de enero al 21 de marzo). </MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 671-S2 Master Universitario en Ingeniería Biomédica. Primavera. Bimestre 2 (del 6 de abril al 2 de junio). </MenuItem>
        </StyledMenu>
    </div>


    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button10" aria-controls="fade-menu10" aria-haspopup="true" aria-expanded={open10 ? 'true' : undefined} onClick={handleClick10} endIcon={<KeyboardArrowDownIcon />}>
            Master Universitario en Ingeniería de Diseño de Producto</Button>
        <StyledMenu id="demo-customized-menu10"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl10} open={open10} onClose={handleClose10}
        >
            <MenuItem onClick={handleClose10} disableRipple> 071-S1 Master Universitario en Ingeniería de Diseño de Producto. Otoño. </MenuItem>
            <MenuItem onClick={handleClose10} disableRipple> 071-S2 Master Universitario en Ingeniería de Diseño de Producto. Primavera. </MenuItem>
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button11" aria-controls="fade-menu11" aria-haspopup="true" aria-expanded={open11 ? 'true' : undefined} onClick={handleClick11} endIcon={<KeyboardArrowDownIcon />}>
        Máster Universitario en Robotics, Graphics and Computer Vision</Button>
        <StyledMenu id="demo-customized-menu11"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl11} open={open11} onClose={handleClose11}
        >
            <MenuItem onClick={handleClose11} disableRipple> 107-S1 Máster Universitario en Robotics, Graphics and Computer Vision. Otoño. </MenuItem>
            <MenuItem onClick={handleClose11} disableRipple> 107-S2 Máster Universitario en Robotics, Graphics and Computer Vision. Primavera. </MenuItem>
        </StyledMenu>
    </div>



    

  

</div>
</div>
  
  
  
        
    );
  }
  
  export default SeleccionHorarioMasters;
  