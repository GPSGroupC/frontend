import React from "react";

const FilaReadOnly = ({ asignatura, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{asignatura.codplan}</td>
      <td>{asignatura.plan}</td>
      <td>{asignatura.area}</td>
      <td>{asignatura.codasig}</td>
      <td>{asignatura.nombre}</td>
      <td>{asignatura.curso}</td>
      <td>{asignatura.periodo}</td>
      <td>{asignatura.horasestteoria}</td>
      <td>{asignatura.horasestproblemas}</td>
      <td>{asignatura.horasestpracticas}</td>
      <td>{asignatura.destvinculo}</td>
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
