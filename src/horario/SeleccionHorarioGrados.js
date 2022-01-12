import React, { useEffect, useState, Fragment } from 'react';
import eina from '../images/eina-logo.png'
import { Link } from 'react-router-dom'
import Api from "./servicios/api";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

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
  const [addFormData, setAddFormData] = useState({
    curso: "",
    periodo: "",
    grupo: "",
    descripcion: ""
  });
  const [openGradoId, setOpenGradoId] = useState(null);

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

  async function añadirHorario(horarioObj) {
    await Api.añadirHorario(horarioObj).then(r => {
      console.log(r);
      document.getElementById("curso").value = "";
      document.getElementById("periodo").value = "";
      document.getElementById("grupo").value = "";
      document.getElementById("descripcion").value = "";
      window.alert("Horario añadido con éxito");
      obtenerHorarios();
    }).catch(err => {
      console.log("Error al añadir horario: ", err)
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

  async function eliminarHorario(idHorario) {
    await Api.eliminarHorario(idHorario).then(r => {
      console.log(r);
      obtenerHorarios();
    }).catch(err => {
      console.log("Error al eliminar horario: ", err)
    })
  }

  useEffect(() => {
    obtenerPlanes();
    obtenerHorarios();
  }, []);

  //Ingenieria Informatica
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, grado) => {
    setAnchorEl(event.currentTarget);
    setOpenGradoId(grado.codplan);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 
  const handleAddFormSubmit = (event, codplan) => {
    event.preventDefault();

    const horarioObj = {
      codplan: codplan,
      curso: addFormData.curso,
      periodo: addFormData.periodo,
      grupo: addFormData.grupo,
      descripcion: addFormData.descripcion
    };

    console.log(horarioObj);
    añadirHorario(horarioObj);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleClickHorario = (e, horario) => {
    e.stopPropagation(); // Hace que el html padre no expanda su comportamiento onClick en este boton
    console.log(horario);
    //window.location.href='/editar-horario'
  };

  const handleDelHorario = (e, horario) => {
    e.stopPropagation(); // Hace que el html padre no expanda su comportamiento onClick en este boton
    console.log(horario);
    eliminarHorario(horario.id);
  };


  return (

    <div className="HorarioSeleccion">

      <div style={{ "margin-left": "37.5%" }} >
        <button type="button" class="btn btn-info btn-md" style={{ "margin-left": "70px" }}>GRADOS Y MASTERS</button>
      </div> <br></br>


      <div className="titulaciones">
        {

          grados.map(grado => <div>
            <Button style={{ width: '500px', marginLeft: '32.5%', marginBottom: '5px' }} id="fade-button" aria-controls="fade-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={(event) => handleClick(event, grado)} endIcon={<KeyboardArrowDownIcon />}>
              {grado.codplan}-{grado.nombre} </Button>
              {
                openGradoId === grado.codplan ? (
                horarios.map(horario => (grado.codplan === horario.codplan) ? 
                <div class="contenedor" style={{ width: '500px', marginLeft: '32.5%' }}>
                  <div class="contenido">
                    <MenuItem  style={{ width: '850px'}}>
                    <MenuItem component={Link} to={{pathname:'/editar-horario/',nombre: grado.nombre, horario: horario}} > 
                      {horario.grupo}-{horario.periodo} {grado.nombre}. {horario.curso}º {horario.descripcion} 
                    </MenuItem>
                    <button id="delButton"onClick={(e) => handleDelHorario(e, horario)}>
                          <DeleteSharpIcon></DeleteSharpIcon>
                        </button> 
                    </MenuItem>
                  </div>
                </div> : null)) : (null)
              }
              {openGradoId === grado.codplan ? (
              <form onSubmit={(event) => handleAddFormSubmit(event,grado.codplan)} style={{ width: '500px', marginLeft: '32.5%', marginBottom: '50px', marginTop: '10px' }}>
                <input style={{ width: "75px", marginLeft: '3%', marginRight: '5px' }}
                  type="number"
                  min="0"
                  id="curso"
                  name="curso"
                  required="required"
                  placeholder="Curso"
                  onChange={handleAddFormChange}
                />
                <input style={{ width: "75px", marginLeft: '1px', marginRight: '5px' }}
                  type="text"
                  id="periodo"
                  name="periodo"
                  required="required"
                  placeholder="Periodo"
                  onChange={handleAddFormChange}
                />
                <input style={{ width: "75px", marginLeft: '1px', marginRight: '5px' }}
                  type="number"
                  min="0"
                  id="grupo"
                  name="grupo"
                  required="required"
                  placeholder="Grupo"
                  onChange={handleAddFormChange}
                />
                <input style={{ width: "150px", marginLeft: '1px', marginRight: '5px' }}
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  required="required"
                  placeholder="Descripción"
                  onChange={handleAddFormChange}
                />
                <button type="submit" class="btn btn-info btn-md" style={{ width: "75px", marginLeft: '0%' }}>Añadir </button>
              </form>
              ):(null)}
          </div>)
        }
      </div>
    </div>

  );
}

export default SeleccionHorarioGrados;