import React,{ useEffect, useState, Fragment } from 'react';
import eina from '../images/eina-logo.png'
import { Link } from 'react-router-dom'
import Api from "./servicios/api";
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

  //const grados = ['Grado 1', 'Grado 2', 'Grado 3']
  const [grados, setGrados] = useState([]);
  const [horarios, setHorarios] = useState([]);

  async function obtenerPlanes() {
    await Api.obtenerPlanes().then(r => {
      console.log(r);
      if (!r.data.message) {
        setGrados(r.data);
      } else {
        setGrados([]);
      }
    }).catch(err => {
      console.log("Error al obtener planes: ", err)
    })
  }

  async function obtenerHorarios() {
    await Api.obtenerHorarios().then(r => {
      console.log(r);
      if (!r.data.message) {
        setHorarios(r.data);
      } else {
        setHorarios([]);
      }
    }).catch(err => {
      console.log("Error al obtener grupos: ", err)
    })
  }

  useEffect(() => {
    obtenerPlanes();
    obtenerHorarios();
  }, []);

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

      <div style={{ "margin-left": "37.5%" }} >
        <button type="button" class="btn btn-info btn-md" style={{ "margin-left": "70px" }}>GRADO</button>
        <Link to=""><button type="button" class="btn btn-outline-info">MASTER</button></Link>
      </div> <br></br>


      <div className="titulaciones">
        {

          grados.map(grado => <div>
            <Button style={{ width: '500px', marginLeft: '32.5%', marginBottom: '5px' }} id="fade-button" aria-controls="fade-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
              {grado.codplan}-{grado.nombre} </Button>

            <StyledMenu id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }} anchorEl={anchorEl} open={open} onClose={handleClose}
            >
              {
                horarios.map(horario => (grado.codplan===horario.codplan) ? <MenuItem component={Link} to="/editar-horario" disableRipple> {horario.grupo}-{horario.periodo} {grado.nombre}. {horario.curso}º </MenuItem>:null)
              }
            </StyledMenu>
          </div>)
        }
      </div>
    </div>

  );
}

export default SeleccionHorarioGrados;