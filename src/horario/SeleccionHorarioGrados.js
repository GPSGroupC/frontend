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





function SeleccionHorarioGrados() {

    //Ingenieria Informatica
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Ingenieria de Diseño
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    //Ingenieria electrica 
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const open3 = Boolean(anchorEl3);
    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorEl3(null);
    };
    

    //Ingenieria mecanica
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const open4 = Boolean(anchorEl4);
    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    const handleClose4 = () => {
        setAnchorEl4(null);
    };

    //Ingenieria quimica
    const [anchorEl5, setAnchorEl5] = React.useState(null);
    const open5 = Boolean(anchorEl5);
    const handleClick5 = (event) => {
        setAnchorEl5(event.currentTarget);
    };
    const handleClose5 = () => {
        setAnchorEl5(null);
    };

    //Ingenieria industrial
    const [anchorEl6, setAnchorEl6] = React.useState(null);
    const open6 = Boolean(anchorEl6);
    const handleClick6 = (event) => {
        setAnchorEl6(event.currentTarget);
    };
    const handleClose6 = () => {
        setAnchorEl6(null);
    };

    //Ingenieria teleco
     const [anchorEl7, setAnchorEl7] = React.useState(null);
     const open7 = Boolean(anchorEl7);
     const handleClick7 = (event) => {
         setAnchorEl7(event.currentTarget);
     };
     const handleClose7 = () => {
         setAnchorEl7(null);
     };

     //Ingenieria electronica
     const [anchorEl8, setAnchorEl8] = React.useState(null);
     const open8 = Boolean(anchorEl8);
     const handleClick8 = (event) => {
         setAnchorEl8(event.currentTarget);
     };
     const handleClose8 = () => {
         setAnchorEl8(null);
     };

     //Arquitectura
     const [anchorEl9, setAnchorEl9] = React.useState(null);
     const open9 = Boolean(anchorEl9);
     const handleClick9 = (event) => {
         setAnchorEl9(event.currentTarget);
     };
     const handleClose9 = () => {
         setAnchorEl9(null);
     };

     //optativas
     const [anchorEl10, setAnchorEl10] = React.useState(null);
     const open10 = Boolean(anchorEl10);
     const handleClick10 = (event) => {
         setAnchorEl10(event.currentTarget);
     };
     const handleClose10 = () => {
         setAnchorEl10(null);
     };

     //rotadas
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

      //quimica consec
      const [anchorEl13, setAnchorEl13] = React.useState(null);
      const open13 = Boolean(anchorEl13);
      const handleClick13 = (event) => {
          setAnchorEl13(event.currentTarget);
      };
      const handleClose13 = () => {
          setAnchorEl13(null);
      };


    return (
  
        <div className="HorarioSeleccion">
          
        <div style={{"margin-left": "37.5%"}} >  
            <button type="button" class="btn btn-info btn-md" style={{"margin-left": "70px"}}>GRADO</button>
            <Link to=""><button type="button" class="btn btn-outline-info">MASTER</button></Link>
        </div> <br></br>


<div className="titulaciones">

    <div>
        <Button style={{width:'500px', marginLeft:'32.5%', marginBottom: '5px'}} id="fade-button" aria-controls="fade-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}> 
        Grado en Ingeniería Informática </Button>

        <StyledMenu id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl} open={open} onClose={handleClose}
        >
            <MenuItem component={Link} to="/editar-horario" disableRipple> 411-S1 Grado en Ingeniería Informática. 1º (M) Otoño </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 411-S2 Grado en Ingeniería Informática. 1º (M) Primavera </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 412-S1 Grado en Ingeniería Informática. 1º (T) Otoño</MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 412-S2 Grado en Ingeniería Informática. 1º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem component={Link} to="/editar-horario" disableRipple> 421-S3 Grado en Ingeniería Informática. 2º (M) Otoño </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 421-S4 Grado en Ingeniería Informática. 2º (M) Primavera</MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 422-S3 Grado en Ingeniería Informática. 2º (T) Otoño </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 422-S4 Grado en Ingeniería Informática. 2º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem component={Link} to="/editar-horario" disableRipple> 431-S5 Grado en Ingeniería Informática. 3º (T) Otoño </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 431-S6 Grado en Ingeniería Informática. 3º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem component={Link} to="/editar-horario" disableRipple> 441-S7 Grado en Ingeniería Informática. 4º (M) Otoño </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 441-S8 PRACTICAS Grado en Ingeniería Informática. 4º (M) Primavera </MenuItem>
            <MenuItem component={Link} to="/editar-horario" disableRipple> 441-S8 TEORIAS Grado en Ingeniería Informática. 4º (M) Primavera </MenuItem>

        </StyledMenu>
    </div>


    <div>

        <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button2" aria-controls="fade-menu2" aria-haspopup="true" aria-expanded={open2 ? 'true' : undefined} onClick={handleClick2} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto </Button>
        <StyledMenu id="demo-customized-menu2"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl2} open={open2} onClose={handleClose2}
        >
            <MenuItem onClick={handleClose2} disableRipple> 011-S1 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose2} disableRipple> 011-S2 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose2} disableRipple> 012-S1 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 1º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose2} disableRipple> 012-S2 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 1º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose2} disableRipple> 021-S3 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 2º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose2} disableRipple> 021-S4 Grado en ingeniería en Diseño Industrial y Desarrollo de Producto. 2º (M) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose2} disableRipple> 031-S5 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 3º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose2} disableRipple> 031-S6 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 3º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose2} disableRipple> 041-S7 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 4º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose2} disableRipple> 041-S8 Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto. 4º (M) Primavera</MenuItem>
        
        </StyledMenu>
        </div>
    </div>


    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button3" aria-controls="fade-menu3" aria-haspopup="true" aria-expanded={open3 ? 'true' : undefined} onClick={handleClick3} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería Eléctrica </Button>
        <StyledMenu id="demo-customized-menu3"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl3} open={open3} onClose={handleClose3}
        >
            <MenuItem onClick={handleClose3} disableRipple> 211-S1 Grado en Ingeniería Eléctrica. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 211-S2 Grado en Ingeniería Eléctrica. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 212-S1 Grado en Ingeniería Eléctrica. 1º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 212-S2 Grado en Ingeniería Eléctrica. 1º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose3} disableRipple> 221-S3 Grado en Ingeniería Eléctrica. 2º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 221-S4 Grado en Ingeniería Eléctrica. 2º (M) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose3} disableRipple> 231-S5 Grado en Ingeniería Eléctrica. 3º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 231-S6 Grado en Ingeniería Eléctrica. 3º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose3} disableRipple> 241-S7 Grado en Ingeniería Eléctrica. 4º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose3} disableRipple> 241-S8 Grado en Ingeniería Eléctrica. 4º (M) Primavera </MenuItem>
           
        </StyledMenu>
    </div>


    
    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button4" aria-controls="fade-menu4" aria-haspopup="true" aria-expanded={open4 ? 'true' : undefined} onClick={handleClick4} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería Mecánica </Button>
        <StyledMenu id="demo-customized-menu4"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl4} open={open4} onClose={handleClose4}
        >
            <MenuItem onClick={handleClose4} disableRipple> 511-S1 Grado en Ingeniería Mecánica. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 511-S2 Grado en Ingeniería Mecánica. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 512-S1 Grado en Ingeniería Mecánica. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 512-S2 Grado en Ingeniería Mecánica. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 513-S1 Grado en Ingeniería Mecánica. 1º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 513-S2 Grado en Ingeniería Mecánica. 1º (T) Primavera </MenuItem>            
            <MenuItem onClick={handleClose4} disableRipple> 514-S1 Grado en Ingeniería Mecánica. 1º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 514-S2 Grado en Ingeniería Mecánica. 1º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            
            <MenuItem onClick={handleClose4} disableRipple> 521-S3 Grado en Ingeniería Mecánica. 2º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 521-S4 Grado en Ingeniería Mecánica. 2º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 522-S3 Grado en Ingeniería Mecánica. 2º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 522-S4 Grado en Ingeniería Mecánica. 2º (T) Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 523-S3 Grado en Ingeniería Mecánica. 2º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 523-S4 Grado en Ingeniería Mecánica. 2º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            
            <MenuItem onClick={handleClose4} disableRipple> 531-S5 Grado en Ingeniería Mecánica. 3º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 531-S6 Grado en Ingeniería Mecánica. 3º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 532-S5 Grado en Ingeniería Mecánica. 3º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 532-S6 Grado en Ingeniería Mecánica. 3º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 533-S5 Grado en Ingeniería Mecánica. 3º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 533-S6 Grado en Ingeniería Mecánica. 3º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose4} disableRipple> 541-S7 Grado en Ingeniería Mecánica. 4º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.1-S7 Grado Ingeniería Mecánica. Optativas Ingeniería Térmica y Fluidos. Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.1-S8 Grado Ingeniería Mecánica. Optativas Ingeniería Térmica y Fluidos. Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.2-S7 Grado Ingeniería Mecánica. Optativas Diseño y cálculo de estructuras. Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.2-S8 Grado Ingeniería Mecánica. Optativas Diseño y cálculo de estructuras. Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.3-S7 Grado Ingeniería Mecánica. Optativas Máquinas y Vehículos. Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.3-S8 Grado Ingeniería Mecánica. Optativas Máquinas y Vehículos. Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.4-S7 Grado Ingeniería Mecánica. Optativas Ingeniería de Fabricación. Otoño </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 541.4-S8 Grado Ingeniería Mecánica. Optativas Ingeniería de Fabricación. Primavera </MenuItem>
            <MenuItem onClick={handleClose4} disableRipple> 542-S7 Grado en Ingeniería Mecánica. 4º (T) Otoño </MenuItem>
           
        </StyledMenu>
    </div>


    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button5" aria-controls="fade-menu5" aria-haspopup="true" aria-expanded={open5 ? 'true' : undefined} onClick={handleClick5} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería Química </Button>
        <StyledMenu id="demo-customized-menu5"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl5} open={open5} onClose={handleClose5}
        >
            <MenuItem onClick={handleClose5} disableRipple> 711-S1 Grado en Ingeniería Química. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 711-S2 Grado en Ingeniería Química. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 712-S1 Grado en Ingeniería Química. 1º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 712-S2 Grado en Ingeniería Química. 1º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose5} disableRipple> 721-S3 Grado en Ingeniería Química. 2º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 721-S4 Grado en Ingeniería Química. 2º (M) Primavera </MenuItem>            
            <MenuItem onClick={handleClose5} disableRipple> 731-S5 Grado en Ingeniería Química. 3º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 731-S6 Grado en Ingeniería Química. 3º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            
            <MenuItem onClick={handleClose5} disableRipple> 741-S7 Grado en Ingeniería Química. 4º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose5} disableRipple> 741-S8 Grado en Ingeniería Química. 4º (M) Primavera </MenuItem>
            
        </StyledMenu>
    </div>



    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button6" aria-controls="fade-menu6" aria-haspopup="true" aria-expanded={open6 ? 'true' : undefined} onClick={handleClick6} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería Tecnologías Industriales </Button>
        <StyledMenu id="demo-customized-menu6"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl6} open={open6} onClose={handleClose6}
        >
            <MenuItem onClick={handleClose6} disableRipple> 811-S1 Grado en Ingeniería de Tecnologías Industriales. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 811-S2 Grado en Ingeniería de Tecnologías Industriales. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 812-S1 Grado en Ingeniería de Tecnologías Industriales. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 812-S2 Grado en Ingeniería de Tecnologías Industriales. 1º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 813-S1 Grado en Ingeniería de Tecnologías Industriales. 1º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 813-S2 Grado en Ingeniería de Tecnologías Industriales. 1º (T) Primavera</MenuItem>   
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose6} disableRipple> 821-S3 Grado en Ingeniería de Tecnologías Industriales. 2º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 821-S4 Grado en Ingeniería de Tecnologías Industriales. 2º (M) Primavera</MenuItem>    
            <MenuItem onClick={handleClose6} disableRipple> 822-S3 Grado en Ingeniería de Tecnologías Industriales. 2º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 822-S4 Grado en Ingeniería de Tecnologías Industriales. 2º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 823-S3 Grado en Ingeniería de Tecnologías Industriales. 2º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 823-S4 Grado en Ingeniería de Tecnologías Industriales. 2º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose6} disableRipple> 831-S5 Grado en Ingeniería de Tecnologías Industriales. 3º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 831-S6 Grado en Ingeniería de Tecnologías Industriales. 3º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 832-S5 Grado en Ingeniería de Tecnologías Industriales. 3º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 832-S6 Grado en Ingeniería de Tecnologías Industriales. 3º (T) Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 833-S5 Grado en Ingeniería de Tecnologías Industriales. 3º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 833-S6 Grado en Ingeniería de Tecnologías Industriales. 3º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose6} disableRipple> 841-S7 Grado en Ingeniería de Tecnologías Industriales. 4º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841-S8 Grado en Ingeniería de Tecnologías Industriales. 4º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.1-S7 Tec. Industriales. Optativas Energía. 4º Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.1-S8 Tec. Industriales. Optativas Energía. 4º Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.2-S7 Tec. Industriales. Optativas Inst. y Const. Industriales. 4º Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.2-S8 Tec. Industriales. Optativas Inst. y Const. Industriales. 4º Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.3-S7 Tec. Industriales. Optativas Mecatrónica. 4º Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.3-S8 Tec. Industriales. Optativas Mecatrónica. 4º Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.4-S7 Tec. Industriales. Optativas Producción Integrada. 4º Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.4-S8 Tec. Industriales. Optativas Producción Integrada. 4º Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.5-S7 Tec. Industriales. Optativas Medios de Transporte. 4º Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 841.5-S8 Tec. Industriales. Optativas Medios de Transporte. 4º Primavera</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 842-S7 Grado en Ingeniería de Tecnologías Industriales. 4º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose6} disableRipple> 842-S8 Grado en Ingeniería de Tecnologías Industriales. 4º (T) Primavera</MenuItem>
           
        </StyledMenu>
    </div>



    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button7" aria-controls="fade-menu7" aria-haspopup="true" aria-expanded={open7 ? 'true' : undefined} onClick={handleClick7} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería Tecnologías y Servicios de Telecomunicación </Button>
        <StyledMenu id="demo-customized-menu7"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl7} open={open7} onClose={handleClose7}
        >
            <MenuItem onClick={handleClose7} disableRipple> 911-S1 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación.. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 911-S2 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 1º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 912-S1 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 1º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 912-S2 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 1º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose7} disableRipple> 921-S3 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 2º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 921-S4 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 2º (M) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose7} disableRipple> 931-S5 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 3º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 931-S6 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. 3º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose7} disableRipple> 941.1-S7 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Sistemas Electrónicos 4º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.1-S8 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Sistemas Electrónicos 4º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.2-S7 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Sistemas de Telecomunicación 4º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.2-S8 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Sistemas de Telecomunicación 4º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.3-S7 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Sonido e imagen 4º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.3-S8 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Sonido e imagen 4º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.4-S7 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Telemática 4º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose7} disableRipple> 941.4-S8 Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación. Optativas Telemática 4º (T) Primavera </MenuItem>
            
        </StyledMenu>
    </div>



    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button8" aria-controls="fade-menu8" aria-haspopup="true" aria-expanded={open8 ? 'true' : undefined} onClick={handleClick8} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Ingeniería Electrónica y Automática </Button>
        <StyledMenu id="demo-customized-menu8"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl8} open={open8} onClose={handleClose8}
        >
            <MenuItem onClick={handleClose8} disableRipple> 311-S1 Grado en Ingeniería Electrónica y Automática. 1º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 311-S2 Grado en Ingeniería Electrónica y Automática. 1º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 312-S1 Grado en Ingeniería Electrónica y Automática. 1º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 312-S2 Grado en Ingeniería Electrónica y Automática. 1º (T) Primavera </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose8} disableRipple> 321-S3 Grado en Ingeniería Electrónica y Automática 2º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 321-S4 Grado en Ingeniería Electrónica y Automática 2º (M) Primavera </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 322-S3 Grado en Ingeniería Electrónica y Automática 2º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 322-S4 Grado en Ingeniería Electrónica y Automática 2º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose8} disableRipple> 331-S5 Grado en Ingeniería Electrónica y Automática 3º (M) Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 331-S6 Grado en Ingeniería Electrónica y Automática 3º (M) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose8} disableRipple> 341-S7 Grado en Ingeniería Electrónica y Automática 4º (T) Otoño </MenuItem>
            <MenuItem onClick={handleClose8} disableRipple> 341-S8 Grado en Ingeniería Electrónica y Automática 4º (T) Primavera </MenuItem>
        
        </StyledMenu>
    </div>


    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button9" aria-controls="fade-menu9" aria-haspopup="true" aria-expanded={open9 ? 'true' : undefined} onClick={handleClick9} endIcon={<KeyboardArrowDownIcon />}>
            Grado en Estudios en Arquitectura </Button>
        <StyledMenu id="demo-customized-menu9"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl9} open={open9} onClose={handleClose9}
        >
            <MenuItem onClick={handleClose9} disableRipple> 111-S1 Grado en Estudios en Arquitectura. 1º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 111-S2 Grado en Estudios en Arquitectura. 1º (M) Primavera</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 112-S1 Grado en Estudios en Arquitectura. 1º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 112-S2 Grado en Estudios en Arquitectura. 1º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose9} disableRipple> 121-S3 Grado en Estudios en Arquitectura. 2º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 121-S4 Grado en Estudios en Arquitectura. 2º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose9} disableRipple> 131-S5 Grado en Estudios en Arquitectura. 3º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 131-S6 Grado en Estudios en Arquitectura. 3º (M) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose9} disableRipple> 141-S7 Grado en Estudios en Arquitectura. 4º (T) Otoño</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 141-S8 Grado en Estudios en Arquitectura. 4º (T) Primavera</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose9} disableRipple> 151-S9 Grado en Estudios en Arquitectura. 5º (M) Otoño</MenuItem>
            <MenuItem onClick={handleClose9} disableRipple> 151-S10 Grado en Estudios en Arquitectura. 5º (M) Primavera</MenuItem>
            
        </StyledMenu>
    </div>


    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button10" aria-controls="fade-menu10" aria-haspopup="true" aria-expanded={open10 ? 'true' : undefined} onClick={handleClick10} endIcon={<KeyboardArrowDownIcon />}>
            Optativas Transversales </Button>
        <StyledMenu id="demo-customized-menu10"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl10} open={open10} onClose={handleClose10}
        >
            <MenuItem onClick={handleClose10} disableRipple> 000-Optativas Transversales. Otoño </MenuItem>
            <MenuItem onClick={handleClose10} disableRipple> 000-Optativas Transversales. Primavera </MenuItem>
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button11" aria-controls="fade-menu11" aria-haspopup="true" aria-expanded={open11 ? 'true' : undefined} onClick={handleClick11} endIcon={<KeyboardArrowDownIcon />}>
            Asignaturas Rotadas Formación Básica </Button>
        <StyledMenu id="demo-customized-menu11"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl11} open={open11} onClose={handleClose11}
        >
            <MenuItem onClick={handleClose11} disableRipple> Asignaturas Rotadas Formación Básica Otoño </MenuItem>
            <MenuItem onClick={handleClose11} disableRipple> Asignaturas Rotadas Formación Básica Primavera </MenuItem>
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button12" aria-controls="fade-menu12" aria-haspopup="true" aria-expanded={open12 ? 'true' : undefined} onClick={handleClick12} endIcon={<KeyboardArrowDownIcon />}>
            Programa Conjunto en Matemáticas e Ingeniería Informática MatInf </Button>
        <StyledMenu id="demo-customized-menu12"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl12} open={open12} onClose={handleClose12}
        >
            <MenuItem onClick={handleClose12} disableRipple> 1º - Programa Conjunto en Matemáticas e Ingeniería Informática (MatiInf) 1er Cuatrimestre</MenuItem>
            <MenuItem onClick={handleClose12} disableRipple> 1º - Programa Conjunto en Matemáticas e Ingeniería Informática (MatiInf) 2º Cuatrimestre </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose12} disableRipple> 2º - Programa Conjunto en Matemáticas e Ingeniería Informática (MatiInf) 1er Cuatrimestre</MenuItem>
            <MenuItem onClick={handleClose12} disableRipple> 2º - Programa Conjunto en Matemáticas e Ingeniería Informática (MatiInf) 2o Cuatrimestre </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose12} disableRipple> 3º - Programa Conjunto en Matemáticas e Ingeniería Informática (MatiInf) 1er Cuatrimestre</MenuItem>
            <MenuItem onClick={handleClose12} disableRipple> 3º - Programa Conjunto en Matemáticas e Ingeniería Informática (MatiInf) 2o Cuatrimestre</MenuItem>
        </StyledMenu>
    </div>

    <div>
        <Button style={{width:'700px', marginLeft:'27.5%', marginBottom: '5px'}} id="fade-button13" aria-controls="fade-menu13" aria-haspopup="true" aria-expanded={open13 ? 'true' : undefined} onClick={handleClick13} endIcon={<KeyboardArrowDownIcon />}>
            Programa consecutivo Química-Ingeniería Química </Button>
        <StyledMenu id="demo-customized-menu13"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }} anchorEl={anchorEl13} open={open13} onClose={handleClose13}
        >
            <MenuItem onClick={handleClose13} disableRipple> 1º Programa Consecutivo en Química e Ingeniería Química (QIngQ) 1er Cuatrimestre </MenuItem>
            <MenuItem onClick={handleClose13} disableRipple> 1º Programa Consecutivo en Química e Ingeniería Química (QIngQ) 2o Cuatrimestre</MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handleClose13} disableRipple> 2º Programa Consecutivo en Química e Ingeniería Química (QIngQ) 1er Cuatrimestre</MenuItem>
            <MenuItem onClick={handleClose13} disableRipple> 2º Programa Consecutivo en Química e Ingeniería Química (QIngQ) 2o Cuatrimestre</MenuItem>
        </StyledMenu>
    </div>
</div>
</div>
        
    );
  }
  
  export default SeleccionHorarioGrados;
  