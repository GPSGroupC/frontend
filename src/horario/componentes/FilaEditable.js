import React from "react";

const FilaEditable = ({editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="codplan"
          required="required"
          placeholder="Plan"
          value={editFormData.codplan}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="codarea"
          required="required"
          placeholder="Área"
          value={editFormData.codarea}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="codasig"
          required="required"
          placeholder="Código"
          value={editFormData.codasig}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="nombre"
          required="required"
          placeholder="Nombre"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'80px'}}
          type="text"
          name="curso"
          required="required"
          placeholder="Curso"
          value={editFormData.curso}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="periodo"
          required="required"
          placeholder="Período"
          value={editFormData.periodo}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="horasestteoria"
          required="required"
          placeholder="Horas estud1"
          value={editFormData.horasestteoria}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="horasestproblemas"
          required="required"
          placeholder="Horas estud2"
          value={editFormData.horasestproblemas}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="horasestpracticas"
          required="required"
          placeholder="Horas estud3"
          value={editFormData.horasestpracticas}
          onChange={handleEditFormChange}
        />
      </td>

      
      <td>
        <button type="submit" class="btn btn-outline-info">Save</button>
        <button type="button" class="btn btn-outline-info" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default FilaEditable;
