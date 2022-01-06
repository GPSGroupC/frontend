import React from "react";

const FilaEditable = ({editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input style={{width:'80px'}}
          type="number"
          min="0"
          readOnly={true}
          name="id"
          required="required"
          placeholder="Código Aula"
          value={editFormData.id}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'80px'}}
          type="text"
          name="acronimo"
          required="required"
          placeholder="Acrónimo"
          value={editFormData.acronimo}
          onChange={handleEditFormChange}
        />
      </td>
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
        <input style={{width:'80px'}}
          type="number"
          min="0"
          name="capacidad"
          required="required"
          placeholder="Capacidad"
          value={editFormData.capacidad}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'40px'}}
          type="number"
          min="0"
          name="edificio"
          required="required"
          placeholder="Edificio"
          value={editFormData.edificio}
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
