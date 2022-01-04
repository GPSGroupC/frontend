import React from "react";

const FilaReadOnly = ({ aula, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{aula.id}</td>
      <td>{aula.acronimo}</td>
      <td>{aula.nombre}</td>
      <td>{aula.capacidad}</td>
      <td>{aula.edificio}</td>
      <td>
        <button type="button" class="btn btn-outline-info" onClick={(event) => handleEditClick(event, aula)}>
          Edit
        </button>
        <button type="button" class="btn btn-outline-info" onClick={() => handleDeleteClick(aula.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FilaReadOnly;
