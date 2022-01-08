import React from "react";

const FilaEditable = ({editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input style={{width:'50px'}}
          type="number"
          name="grupo"
          required="required"
          placeholder="Grupo"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'300px'}}
          type="text"
          name="nombre"
          required="required"
          placeholder="Nombre"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
    </td>

    <td>
        <input style={{width:'50px'}}
          type="number"
          name="curso"
          required="required"
          placeholder="Curso"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
      </td>

    <td>
        <input style={{width:'50px'}}
          type="text"
          name="turno"
          required="required"
          placeholder="Turno"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
        </td>

        <td>
        <input style={{width:'50px'}}
          type="number"
          name="semestre"
          required="required"
          placeholder="Semestre"
          value={editFormData.nombre}
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
