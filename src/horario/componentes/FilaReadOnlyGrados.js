import React from "react";
import { Link } from 'react-router-dom'


const FilaReadOnly = ({ grado, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <Link to="/editar-cursos"><td>{grado.nombre}</td></Link>
      <td>
        <button type="button" class="btn btn-outline-info" onClick={(event) => handleEditClick(event, grado)}>
          Edit
        </button>
        <button type="button" class="btn btn-outline-info" onClick={() => handleDeleteClick(grado.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FilaReadOnly;
