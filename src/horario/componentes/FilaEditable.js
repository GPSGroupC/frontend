import React from "react";

const FilaEditable = ({editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input style={{width:'60px'}}
          type="number"
          min="0"
          name="codplan"
          required="required"
          placeholder="Código Plan"
          value={editFormData.codplan}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'200px'}}
          type="text"
          name="plan"
          required="required"
          placeholder="Plan"
          value={editFormData.plan}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'200px'}}
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
          type="number"
          min="0"
          name="codasig"
          required="required"
          placeholder="Código"
          value={editFormData.codasig}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input style={{width:'200px'}}
          type="text"
          name="nombre"
          required="required"
          placeholder="Nombre"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'40px'}}
          type="number"
          min="0"
          name="curso"
          required="required"
          placeholder="Curso"
          value={editFormData.curso}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'60px'}}
          type="text"
          name="periodo"
          required="required"
          placeholder="Período"
          value={editFormData.periodo}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'80px'}}
          type="number"
          step=".001"
          min="0"
          name="horasestteoria"
          required="required"
          placeholder="Horas Estud Teoría"
          value={editFormData.horasestteoria}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'80px'}}
          type="number"
          step=".001"
          min="0"
          name="horasestproblemas"
          required="required"
          placeholder="Horas Estud Problemas"
          value={editFormData.horasestproblemas}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'80px'}}
          type="number"
          step=".001"
          min="0"
          name="horasestpracticas"
          required="required"
          placeholder="Horas Estud Prácticas"
          value={editFormData.horasestpracticas}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input style={{width:'80px'}}
          type="number"
          min="0"
          name="destvinculo"
          required="required"
          placeholder="Destino Vínculo"
          value={editFormData.destvinculo}
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
