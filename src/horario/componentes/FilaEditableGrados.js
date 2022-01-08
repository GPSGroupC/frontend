import React from "react";

const FilaEditable = ({editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
    
      <td>
        <input style={{width:'400px'}}
          type="text"
          name="nombre"
          required="required"
          placeholder="Nombre"
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
