import React from "react";
import { Link } from 'react-router-dom'


const FilaReadOnly = ({ curso, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{curso.grupo}</td>
      <td><Link to="/editar-horario">{curso.nombre}</Link></td>
      <td>{curso.curso}</td>
      <td>{curso.turno}</td>
      <td>{curso.semestre}</td>
      <td>
        <button type="button" class="btn btn-outline-info" onClick={(event) => handleEditClick(event, curso)}>
          Edit
        </button>
        <button type="button" class="btn btn-outline-info" onClick={() => handleDeleteClick(curso.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FilaReadOnly;
