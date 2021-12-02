import React from "react";

const FilaEditable = ({editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="plan"
          required="required"
          placeholder="Plan"
          value={editFormData.plan}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="area"
          required="required"
          placeholder="Área"
          value={editFormData.area}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="codigo"
          required="required"
          placeholder="Código"
          value={editFormData.codigo}
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
          name="horas_estud1"
          required="required"
          placeholder="Horas estud1"
          value={editFormData.horas_estud1}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="horas_estud2"
          required="required"
          placeholder="Horas estud2"
          value={editFormData.horas_estud2}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="horas_estud3"
          required="required"
          placeholder="Horas estud3"
          value={editFormData.horas_estud3}
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
