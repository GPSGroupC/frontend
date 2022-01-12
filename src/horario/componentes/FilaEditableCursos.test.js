import React from "react";
import ReactDOM from "react-dom";
import FilaEditable from "./FilaEditableCursos";

//se renderiza correctamente
it('Se renderiza correctamente', () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilaEditable></FilaEditable>, div)
    
});