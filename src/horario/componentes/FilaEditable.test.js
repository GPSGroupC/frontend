
import FilaEditable from "./FilaEditable";
import React from "react";
import ReactDOM from "react-dom";

//se renderiza correctamente
it('Se renderiza correctamente', () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilaEditable></FilaEditable>, div)
    
});