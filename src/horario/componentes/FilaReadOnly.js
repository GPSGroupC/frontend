import React from "react";

const FilaReadOnly = ({ asignatura, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{asignatura.plan}</td>
      <td>{asignatura.area}</td>
      <td>{asignatura.codigo}</td>
      <td>{asignatura.nombre}</td>
      <td>{asignatura.curso}</td>
      <td>{asignatura.periodo}</td>
      <td>{asignatura.horas_estud1}</td>
      <td>{asignatura.horas_estud2}</td>
      <td>{asignatura.horas_estud3}</td>
      <td>
        <button type="button" class="btn btn-outline-info" onClick={(event) => handleEditClick(event, asignatura)}>
          Edit
        </button>
        <button type="button" class="btn btn-outline-info" onClick={() => handleDeleteClick(asignatura.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FilaReadOnly;
